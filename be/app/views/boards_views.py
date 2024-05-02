from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from app.models import Board, User
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from app.serializer import BoardSerializer
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db.models import F

@api_view(['GET'])
def get_Boards(request):
    boards = Board.objects.all()

    serializer = BoardSerializer(boards, many=True)
    return Response(serializer.data)



@api_view(['GET'])   
def get_Board(request, pk):
    board = get_object_or_404(Board, id=pk)
    serializer = BoardSerializer(board)
    return Response(serializer.data)



@api_view(['GET'])      #게시물 필터링.
def get_TopBoards(request):                  #like엔 5배의 가중치 부여.
    boards = Board.objects.annotate(popularity=F('show')+5*F('like')).order_by('-popularity')[0:5]
    serializer = BoardSerializer(boards, many=True)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_Board(request):
    user = User.objects.get(name=request.user)
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

    

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_Board(request, detail_pk, update_pk):
    data = request.data
    try:
        board = Board.objects.get(id=update_pk)
    except Board.DoesNotExist:
        return Response({'detail': 'Board not found'}, status=404)

    update_fields = []
    for field in ['title', 'content', 'product_url', 'image_url']:
        if field in data:
            setattr(board, field, data[field])
            update_fields.append(field)

    if update_fields:
        board.save(update_fields=update_fields)

    serializer = BoardSerializer(board, many=False)
    return Response(serializer.data)



@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_Board(request, pk):
    board = Board.objects.get(id=pk)
    board.delete()
    return Response('Board Deleted')