from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from app.models import Item, Review, Category, Item_QnA, Seller, Tag, User, auth_user, Interaction, OrderItem
from app.serializer import ItemSerializer, ReviewSerializer, CategorySerializer, ItemQnASerializer, TagSerializer, SimpleItemSerializer, SingleItemSerializer
from datetime import datetime
from django.core.paginator import Paginator
import json
from rest_framework import status
from django.db.models import Q
import ssl
from elasticsearch import Elasticsearch
from transformers import BertTokenizer, BertModel
from django.conf import settings
import torch
import os
from dotenv import load_dotenv
from operator import itemgetter
import logging
from django.core.cache import cache

load_dotenv()
logging.basicConfig(level=logging.DEBUG)



ca_cert_path = os.path.join(settings.BASE_DIR, 'certs/http_ca.crt')
ELASTIC_PASSWORD = os.getenv('ELASTIC_PASSWORD')
es = Elasticsearch(
    ['https://localhost:9200', 'https://127.0.0.1:9200'],
    basic_auth=('elastic', ELASTIC_PASSWORD),
    verify_certs=True,
    ca_certs=ca_cert_path,
)

tokenizer = BertTokenizer.from_pretrained('monologg/kobert')
model = BertModel.from_pretrained('monologg/kobert')

def embed_query(query):
    inputs = tokenizer(query, return_tensors='pt', padding=True, truncation=True)
    with torch.no_grad():
        outputs = model(**inputs)
    embedding = outputs.last_hidden_state.mean(dim=1).cpu().numpy().tolist()[0]
    return embedding

def create_itemindex(item):
    body = {
        "name": item.name,
        "description": item.description,
        "category": item.category_id.name,
        "embedding": embed_query(item.name)
    }
    es.index(index='items', id=item.id, body=body)
    print(f"Item {item.id} indexed")
def update_itemindex(item):
    body = {
        "doc": {
            "name": item.name,
            "description": item.description,
            "category": item.category_id.name,
            "embedding": embed_query(item.name)
        }
    }
    es.update(index='items', id=item.id, body=body)
    print(f"Item {item.id} updated")
def delete_itemindex(item):
    es.delete(index='items', id=item.id)
    print(f"Item {item.id} deleted")

@api_view(['GET'])
def get_items(request):
    query = request.GET.get('query', '')
    categories = request.query_params.getlist('category', [])
    page = request.query_params.get('page', 1)
    categories = [c for c in categories if c]

    if query:
        query_embedding = embed_query(query)
        script_query = {
            "script_score": {
                "query": {"match_all": {}},
                "script": {
                    "source": "cosineSimilarity(params.query_vector, 'embedding') + 1.0",
                    "params": {"query_vector": query_embedding}
                }
            }
        }
        response = es.search(index='items', body={"query": script_query})
        sorted_hits = sorted(response['hits']['hits'], key=itemgetter('_score'), reverse=True)
        item_ids = [hit['_id'] for hit in sorted_hits]
        # item_ids = [hit['_id'] for hit in response['hits']['hits']]
        if len(categories) > 0:
            items = Item.objects.filter(Q(id__in=item_ids) | Q(name__contains=query), category_id__in=categories)
        else:
            items = Item.objects.filter(Q(id__in=item_ids) | Q(name__contains=query))
   
    elif len(categories) > 0:
        items = Item.objects.filter(category_id__in=categories)
    else:
        items = Item.objects.all()
    paginator = Paginator(items, 12)  # 12 items per page
    paginated_items = paginator.get_page(page)
    
    serializer = ItemSerializer(paginated_items, many=True)
    
    return Response({
        'items': serializer.data,
        'total_pages': paginator.num_pages,
        'current_page': paginated_items.number
    })

#redis 서버 띄우고 get_items cacheing 추가
# @api_view(['GET'])
# def get_items(request):
#     query = request.GET.get('query', '')
#     categories = request.query_params.getlist('category', [])
#     page = request.query_params.get('page', 1)
#     categories = [c for c in categories if c]

#     cache_key = f'items_{query}_{str(categories)}_{page}'
#     items = cache.get(cache_key)
#     if not items:
#         if query:
#             query_embedding = embed_query(query)
#             script_query = {
#                 "script_score": {
#                     "query": {"match_all": {}},
#                     "script": {
#                         "source": "cosineSimilarity(params.query_vector, 'embedding') + 1.0",
#                         "params": {"query_vector": query_embedding}
#                     }
#                 }
#             }
#             response = es.search(index='items', body={"query": script_query})
#             sorted_hits = sorted(response['hits']['hits'], key=itemgetter('_score'), reverse=True)
#             item_ids = [hit['_id'] for hit in sorted_hits]
#             if len(categories) > 0:
#                 items = Item.objects.filter(id__in=item_ids, category_id__in=categories)
#             else:
#                 items = Item.objects.filter(id__in=item_ids)
#         elif len(categories) > 0:
#             items = Item.objects.filter(category_id__in=categories)
#         else:
#             items = Item.objects.all()
#         cache.set(cache_key, items)
#     paginator = Paginator(items, 12)  # 12 items per page
#     paginated_items = paginator.get_page(page)
    
#     serializer = ItemSerializer(paginated_items, many=True)
    
#     return Response({
#         'items': serializer.data,
#         'total_pages': paginator.num_pages,
#         'current_page': paginated_items.number
#     })

# @api_view(['GET'])
# def get_my_items(request):
#     user = User.objects.get(username=request.user)
#     seller = Seller.objects.get(user_id=user)
#     items = Item.objects.filter(seller_id=seller)
    
#     serializer = ItemSerializer(items, many=True)
#     return Response({
#         'items': serializer.data,
#         'total_items': len(serializer.data)  # 전체 아이템 수를 반환할 수도 있음
#     })
# 페이지네이션 코드입니다. 페이지당 12개의 아이템을 보여줍니다.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_my_items(request):
    user = User.objects.get(username=request.user)
    seller = Seller.objects.get(user_id=user)
    items = Item.objects.filter(seller_id=seller).order_by('id')

    # 페이지네이터 설정: 한 페이지당 12개의 아이템
    paginator = Paginator(items, 12)
    
    # 요청에서 페이지 번호 가져오기 (기본값: 1)
    page_number = request.GET.get('page', 1)
    page_obj = paginator.get_page(page_number)

    # 현재 페이지의 아이템을 시리얼라이즈
    serializer = ItemSerializer(page_obj, many=True)
    
    # 응답에 현재 페이지의 아이템과 전체 아이템 수, 전체 페이지 수 포함
    return Response({
        'items': serializer.data,
        'total_items': paginator.count,
        'total_pages': paginator.num_pages,
        'current_page': page_obj.number
    })	
    
@api_view(['GET'])
def get_top_items(request):
    items = Item.objects.all().order_by('-rate')[:5]
    serializer = ItemSerializer(items, many=True)
    return Response(serializer.data)

@api_view(['Post'])
@permission_classes([IsAuthenticated])
def view_item(request, pk):
    item = get_object_or_404(Item, id=pk)
    user = request.user
    staytime = request.data.get('stayTime', None)
    stay_time_interval = f'{staytime} seconds'

    Interaction.objects.create(user_id_id=user.id, content_type='item', content_id=pk, interaction_type='view', stay_time=stay_time_interval)
    
    return Response('Interaction created')
@api_view(['GET'])
def get_all_items(request):
    items = Item.objects.all()
    
    serializer = SimpleItemSerializer(items, many=True)
    return Response(serializer.data)
    
@api_view(['GET'])
def item_details(request, pk):
    item = Item.objects.get(pk=pk)
    serializer = SingleItemSerializer(item)
    return Response(serializer.data)


@api_view(['POST'])
def create_item(request):
    user = User.objects.get(username=request.user)
    seller = Seller.objects.get(user_id=user)
    print(tag_id.id)
    data = request.data
    item = Item.objects.create(
        seller_id = seller,
        category_id = Category.objects.get(id=request.data['category']), 
        tag_id = Tag.objects.get(id=request.data['tag']),
        name = data['name'],
        price = data['price'],
        description = data['description'],
        image_url = data['image'],
        rate = 0,
        created_at = datetime.now()
        
        )
    
    serializer = SingleItemSerializer(item, many=False)
    create_itemindex(item)  
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
    data = request.data.get('product', {})
    print(data)
    
    try:
        item = Item.objects.get(id=pk)
    except Item.DoesNotExist:
        return Response({"error": "Item not found"}, status=404)

    # Update fields if they exist in the data
    if 'name' in data:
        item.name = data['name']
    if 'price' in data:
        item.price = data['price']
    if 'description' in data:
        item.description = data['description']
    
    if 'category' in data:
        try:
            category = Category.objects.get(id=data['category'])
            item.category_id = category
        except Category.DoesNotExist:
            return Response({"error": "Category not found"}, status=400)
    
    if 'tag' in data:
        try:
            tag = Tag.objects.get(id=data['tag'])
            item.tag_id = tag
        except Tag.DoesNotExist:
            return Response({"error": "Tag not found"}, status=400)

    item.save()
    serializer = SingleItemSerializer(item, many=False)
    update_itemindex(item)
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
        delete_itemindex(item)
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
    Interaction.objects.create(
        user_id_id = user.id,
        content_type='item',
        interaction_type = 'review',
        content_id = review.item_id_id
    )
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
        if user_auth.is_superuser == False:
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