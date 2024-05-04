from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.models import Item, Review, Category, Item_QnA, Seller, Tag, User, auth_user
from app.serializer import ItemSerializer, ReviewSerializer, CategorySerializer, ItemQnASerializer, TagSerializer
from datetime import datetime
import json


@api_view(['GET'])
def get_items(request):
    query = request.GET.get('query')
    print ("query=", query) 
    if query == None:
        query = ''
    categories = request.query_params.getlist('category')
    categories = [c for c in categories if c]
    if categories:
        items = Item.objects.filter(category_id_id__in=categories, name__icontains=query)
        print(categories)
    else:
        items = Item.objects.filter(name__icontains=query)
    serializer = ItemSerializer(items, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def item_details(request, pk):
    item = Item.objects.get(pk=pk)
    serializer = ItemSerializer(item)
    return Response(serializer.data)


@api_view(['POST'])
def create_item(request):
    user = User.objects.get(username=request.user)
    seller = Seller.objects.get(user_id=user)
    tag_id= Tag.objects.get(id=request.data["tag"])
    category = Category.objects.get(id=request.data["category"])
    item = Item.objects.create(
        seller_id = seller,
        category_id = category, 
        tag_id = tag_id,
        name = "",
        price = 0,
        description = "",
        image_url = "",
        rate = 0,
        created_at = datetime.now()
        
        )
    serializer = ItemSerializer(item, many=False)

    return Response(serializer.data)


@api_view(['PUT'])
def update_item(request, pk):
    data = request.data
    category = Category.objects.get(id=data['category'])
    item = Item.objects.get(id=pk)

    item.name = data['name']
    item.price = data['price']
    item.category_id = category
    item.description = data['description']
    item.save()
    serializer = ItemSerializer(item, many=False)
    
    return Response(serializer.data)

@api_view(['DELETE'])
def delete_item(request, pk):
    try:
        item = Item.objects.get(pk=pk)
        item.delete()
        return Response("Item deleted")
    except Item.DoesNotExist:
        return Response("Item does not exist")

@api_view(['GET'])
def get_reviews(request):
    reviews = Review.objects.all()
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_review(request, pk):
    reviews = Review.objects.filter(id=pk)
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def create_review(request, item_id):
    user = User.objects.get(username=request.user)
    item = Item.objects.get(id=item_id)
    review = Review.objects.create( 
        user_id=user,
        item_id=item,
        rate=5,
        content="",
        image_url="",
    )
    serializer = ReviewSerializer(review, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
def update_review(request, pk):
    # try:
    review = Review.objects.get(id=pk)
    # except Review.DoesNotExist:
        # return Response({"error": "Review not found"})
    
    # item_id = review.item_id.id
    user = User.objects.get(username=request.user)
    # user_auth = auth_user.objects.get(username=request.user)

    # 리뷰 작성자와 수정자의 id가 다르거나 관리자가 아닐 경우 수정 불가능
    if user.id != review.user_id.id:
        return Response({"error": "You are not allowed to edit this review"})
    data = request.data
    review.title = data['title']
    review.content = data['content']
    review.rate = data['rate']

    review.save()
    serializer = ReviewSerializer(review, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def uploadImage(request, pk):
    review = Review.objects.get(id=pk)
    review.image_url = request.FILES.get('file')
    review.save()
    return Response('Image was uploaded')

@api_view(['DELETE'])
def delete_review(request, pk):
    try:
        review = Review.objects.get(pk=pk)
    except Review.DoesNotExist:
        return Response({"error": "Review not found"})
    
    # 리뷰 작성자와 수정자의 id가 다르거나 관리자가 아닐 경우 삭제 불가능
    user = User.objects.get(username=request.user)
    user_auth = auth_user.objects.get(username=request.user)
    if user.id != review.user_id.id:
        if user_auth.is_superuser == False:
            return Response({"error": "You are not allowed to delete this review"})
    
    review.delete()
    return Response(status=204)

@api_view(['GET'])
def get_category(request):
    category = Category.objects.all()
    serializer = CategorySerializer(category, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def create_qna(request,item_id):
    user = User.objects.get(username=request.user)
    item = Item.objects.get(pk=item_id)
  
    title = request.data.get('title')
    content = request.data.get('content')
    image_url = request.data.get('image_url')

    current_time = datetime.now()
    qna_board = Item_QnA.objects.create(
        user_id=user,
        item_id=item,
        title=title,
        content=content,
        image_url=image_url,
        created_at=current_time
    )

    serializer = ItemQnASerializer(qna_board, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
def update_qna(request,pk):
    try:
        qna = Item_QnA.objects.get(pk=pk)
    except Item_QnA.DoesNotExist:
        return Response({"error": "QnA not found"})
    
    user = User.objects.get(username=request.user)
    user_auth = auth_user.objects.get(username=request.user)

    if user.id != qna.user_id.id:
        if user_auth.is_superuser == False:
            return Response({"error": "You are not allowed to edit this QnA"})
    
    data = request.data.copy()
    data['item_id'] = qna.item_id.id
    data['user_id'] = user.id
    
    serializer = ItemQnASerializer(qna, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(['DELETE'])
def delete_qna (request, pk):
    try:
        item_qna = Item_QnA.objects.get(pk=pk)
    except Item_QnA.DoesNotExist:
        return Response({"error": "Item Q&A not found"}, status=404)
    
    user = User.objects.get(username=request.user)
    user_auth = auth_user.objects.get(username=request.user)

    if user.id != item_qna.user_id.id:
        if  user_auth.is_superuser == False:
            return Response({"error": "You are not allowed to delete this item Q&A"})
    
    item_qna.delete()
    return Response("delete Success") 

@api_view(['GET'])
def get_tag(request):
    tags = Tag.objects.all()
    serializer = TagSerializer(tags, many=True)
    return Response(serializer.data)
