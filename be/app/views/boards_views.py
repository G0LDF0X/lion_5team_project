from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from app.models import Board
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from app.serializer import BoardSerializer
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

@api_view(['GET'])
def get_Boards(request):     #board_index
    boards = Board.objects.all()

    serializer = BoardSerializer(boards, many=True)
    return Response(serializer.data)
    # return Response({'boards': serializer.data, 'page': page, 'pages': paginator.num_pages})




@api_view(['GET'])      #board_detail
def get_Board(request, pk):
    board = get_object_or_404(Board, id=pk)
    serializer = BoardSerializer(board, many=False)
    return Response(serializer.data)


@api_view(['GET'])      #board_top
def get_TopBoards(request):
    boards = Board.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = BoardSerializer(boards, many=True)
    return Response(serializer.data)


@api_view(['POST'])    #board_create
@permission_classes([IsAuthenticated])
def create_Board(request):
    user = request.user
    board = Board.objects.create(
        user_id=user,
        title='nomal title',
        content='',
        image_url='',
        product_url='',
        show=0,
        like=0
    )
    serializer = BoardSerializer(board, many=False)
    return Response(serializer.data)

    
@api_view(['PUT'])  #board_update
@permission_classes([IsAuthenticated])
def update_Board(request, pk):
    data = request.data
    board = Board.objects.get(_id=pk)

    board.title = data['title']
    board.content = data['content']
    board.image_url = data['image_url']
    board.product_url = data['product_url']
    board.save()
    serializer = BoardSerializer(board, many=False)
    return Response(serializer.data)




@api_view(['DELETE'])   #board_delete
@permission_classes([IsAdminUser])
def delete_Board(request, pk):
    board = Board.objects.get(_id=pk)
    board.delete()
    return Response('Board Deleted')





@api_view(['POST'])  #board_upload
def upload_Board(response, request):
    data = response.data
    
    board_id = data['board_id']
    board = Board.objects.get(_id=board_id)

    board.image = request.FILES.get('image')
    board.save()

    return Response('board was uploaded')