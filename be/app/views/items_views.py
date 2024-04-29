from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.models import Item, Category, Tag, Seller
from app.serializer import ItemSerializer
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

@api_view(['GET','POST'])
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


@api_view(['GET','DELETE'])
def delete_item(request, pk):
    try:
        item = Item.objects.get(pk=pk)
        item.delete()
        return Response("Item deleted")
    except Item.DoesNotExist:
        return Response("Item does not exist")

@api_view(['GET','PUT'])
def update_item(request, pk):
    item = Item.objects.get(pk=pk)
    serializer = ItemSerializer(instance=item, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)