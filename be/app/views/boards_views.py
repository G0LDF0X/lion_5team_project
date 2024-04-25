from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from app.models import Board
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from app.serializer import BoardSerializer
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

@api_view(['GET'])
def get_Boards(request):
    # query = request.GET.get('query')
    # print('query=', query)
    # if query == None:
    #     query = ''
    # boards = Board.objects.filter(name__icontains=query)
    # page = request.GET.get('page', 1)
    # try:
    #     page = int(page)
    # except:
    #     page = 1
    # paginator = Paginator(boards, 10)
    # print("pages=", paginator.num_pages)
    # try:
    #     boards = paginator.page(page)
    # except PageNotAnInteger:
    #     boards = paginator.page(1)
    # except EmptyPage:
    #     boards = paginator.page(paginator.num_pages)

    # if page == None:
    #     page = 1
    boards = Board.objects.all()
    # page = int(page)

    serializer = BoardSerializer(boards, many=True)
    return Response(serializer.data)
    # return Response({'boards': serializer.data, 'page': page, 'pages': paginator.num_pages})
    



@api_view(['GET'])
def get_Board(request, pk):
    board = get_object_or_404(Board, _id=pk)
    serializer = BoardSerializer(board, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def get_TopBoards(request):
    boards = Board.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = BoardSerializer(boards, many=True)
    return Response(serializer.data)


@api_view(['POST'])
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

    
@api_view(['PUT'])
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
