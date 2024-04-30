from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.models import Item, Category, Tag, Seller
from app.serializer import ItemSerializer, CategorySerializer
from datetime import datetime

@api_view(['GET'])
def get_items(request):
    items = Item.objects.all()
    serializer = ItemSerializer(items, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def item_details(request, pk):
    item = Item.objects.get(pk=pk)
    serializer = ItemSerializer(item)
    return Response(serializer.data)

@api_view(['POST'])
def create_item(request):
    user = request.user
    seller = Seller.objects.get(id=2)
    tag = Tag.objects.get(id=1)
    category = Category.objects.get(id=1)
    item = Item.objects.create(
        seller_id = seller,
        category_id = category, 
        tag_id = tag,
        name = "",
        price = 0,
        description = "",
        image_url = "",
        rate = 0,
        created_at = datetime.now()
        
        )
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

@api_view(['GET'])
def get_category(request):
    category = Category.objects.all()
    serializer = CategorySerializer(category, many=True)
    return Response(serializer.data)