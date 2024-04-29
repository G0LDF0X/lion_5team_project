from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.models import Item, Category, Tag, Seller
from app.serializer import ItemSerializer
<<<<<<< HEAD
from datetime import datetime
=======
from rest_framework import status
>>>>>>> 98c8f6d3bf02ea320cbe58c4aad37c8552979855

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
<<<<<<< HEAD
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
=======
    if request.method == 'POST':
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

>>>>>>> 98c8f6d3bf02ea320cbe58c4aad37c8552979855


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
    serializer = ItemSerializer(item, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)