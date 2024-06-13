from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from app.models import Item, Review, Category, Item_QnA, Seller, Tag, User, auth_user, Interaction, OrderItem
from app.serializer import ItemSerializer, ReviewSerializer, CategorySerializer, ItemQnASerializer, TagSerializer
from datetime import datetime
from django.core.paginator import Paginator
import json
from rest_framework import status
from django.db.models import Q

@api_view(['Post'])
@permission_classes([IsAuthenticated])
def view_item(request, pk):
    item = get_object_or_404(Item, id=pk)
    user = request.user
    staytime = request.data.get('stayTime', None)
    stay_time_interval = f'{staytime} seconds'

    Interaction.objects.create(user_id_id=user.id, content_type='item', content_id=pk, interaction_type='view', stay_time=stay_time_interval)
    serializer = ItemSerializer(item)
    return Response(serializer.data)

@api_view(['GET'])
def get_items(request):
    query = request.GET.get('query', '')

    suggestions = request.query_params.get('s','')
    categories = request.query_params.getlist('category', [])
    page = request.query_params.get('page', 1)
    if suggestions:
        suggestions_list = suggestions.split(',')
    
    else:
        suggestions_list = []
    # page = request.query_params.get('page', 1)
    # items_per_page = request.query_params.get('items_per_page', 10)
    
    categories = [c for c in categories if c]
    suggestions_list = [s.strip() for s in suggestions_list if s.strip()]
    item_query = Q()
    if categories:
        item_query &= Q(category_id_id__in=categories)
    if suggestions_list:
        suggestions_query = Q()
        for suggestion in suggestions_list:
            suggestions_query |= Q(name__icontains=suggestion)
        item_query &= suggestions_query
    if query:
        query_condition = Q(name__icontains=query) | Q(description__icontains=query)
        item_query |= query_condition
    # print(item_query)   
    items = Item.objects.filter(item_query)
    # if categories and suggestions_list:
    #     items = Item.objects.filter(Q(category_id_id__in=categories) &  Q(name__icontains=''.join(suggesions_llist)))
    #     print("2",' '.join(suggestions_list))
    #     print(categories)
    # elif categories:    
    #     items = Item.objects.filter( category_id_id__in=categories)
    #     print("3",' '.join(suggestions_list))
    # elif suggestions_list:
    #     items = Item.objects.filter(name__icontains=','.join(suggestions_list))
    #     print("4",' '.join(suggestions_list))
        
        #     items = Item.objects.filter(name__icontains=query)
    serializer = ItemSerializer(items, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_my_items(request):
    user = User.objects.get(username=request.user)
    seller = Seller.objects.get(user_id=user)
    items = Item.objects.filter(seller_id=seller)
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
    tag_id= Tag.objects.get(id=1)
    category = Category.objects.get(id=1)
    data = request.data
    item = Item.objects.create(
        seller_id = seller,
        category_id = category, 
        tag_id = tag_id,
        name = data['name'],
        price = data['price'],
        description = data['description'],
        image_url = data['image'],
        rate = 0,
        created_at = datetime.now()
        
        )
    serializer = ItemSerializer(item, many=False)

    return Response(serializer.data)

@api_view(['POST'])
def search_Interaction(request):
    query = request.data['query']
    user = User.objects.get(username=request.user)
    
    Interaction.objects.create(
        user_id_id = user.id,
        content_type='item',
        interaction_type = 'search',
        search_query=query
    )
    return Response('Interaction created')



@api_view(['PUT'])
def update_item(request, pk):
    data = request.data
    category = Category.objects.get(id=data['category'])
    item = Item.objects.get(id=pk)

    item.name = data['name']
    item.price = data['price']
    item.category_id = category
    item.description = data['description']
    item.tag_id = Tag.objects.get(id=data['tag'][0])
    item.save()
    serializer = ItemSerializer(item, many=False)
    
    return Response(serializer.data)

@api_view(['PUT'])
def upload_image(request, pk):
    item = Item.objects.get(id=pk)
    item.image_url = request.FILES.get('image')
    item.save()
    return Response('Image was uploaded')

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
def get_my_reviews(request):
    user = User.objects.get(username=request.user)
    reviews = Review.objects.filter(user_id=user)
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def get_review(request, pk):
    reviews = Review.objects.filter(id=pk)
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def create_review(request, item_id):
    print(request.user)
    user = User.objects.get(username=request.user)
    item = Item.objects.get(id=item_id)
    data = request.data

    review = Review.objects.create(
        item_id=item,
        user_id=user,
        title='',
        content='',
        rate=5,
        image_url=''
    )
    # Interaction.objects.create(
    #     user_id_id = user.id,
    #     content_type='item',
    #     interaction_type = 'review',
    #     item_id_id = item_id
    # )

    serializer = ReviewSerializer(review, many=False)
    return Response(serializer.data, status=status.HTTP_201_CREATED)
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
    # Get the OrderItem instance with the ID from the request data
    orderitem = get_object_or_404(OrderItem, id=data['orderitem_id'])
    review.orderitem_id = orderitem
    
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
    item = Item.objects.get(id=item_id)
    title = ''
    content = ''
    image_url = ''
    current_time = datetime.now()
    qna_board = Item_QnA.objects.create(
        user_id_id=user.id,
        item_id_id=item.id,
        title=title,
        content=content,
        image_url=image_url,
        created_at=current_time
    )

    serializer = ItemQnASerializer(qna_board, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
def update_qna(request,pk):
    
    qna = Item_QnA.objects.get(id=pk)
    user = User.objects.get(username=request.user)
    user_auth = auth_user.objects.get(username=request.user)

    if user.id != qna.user_id.id:
        if user_auth.is_superuser == False:
            return Response({"error": "You are not allowed to edit this QnA"})
    data = request.data
    qna.title = data['title']
    qna.content = data['content']
    if 'image_url' in data:
        if data['image_url'] == null:
            qna.image_url = ''
        qna.image_url = data['image_url']
    qna.save()
    
    serializer = ItemQnASerializer(qna, many=False)
    return Response(serializer.data)
@api_view(['DELETE'])
def delete_qna (request, pk):
    try:
        item_qna = Item_QnA.objects.get(id=pk)
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

@api_view(['GET'])
def get_tag_with_category(request, pk):
    tags = Tag.objects.filter(category_id=pk)
    serializer = TagSerializer(tags, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_qna(request):
    qna = Item_QnA.objects.all()
    serializer = ItemQnASerializer(qna, many=True)
    return Response(serializer.data)