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
def get_Boards(request):     #board_index
    boards = Board.objects.all()

    serializer = BoardSerializer(boards, many=True)
    return Response(serializer.data)
    # return Response({'boards': serializer.data, 'page': page, 'pages': paginator.num_pages})



@api_view(['GET'])      #board_detail
def get_Board(request, pk):
    board = get_object_or_404(Board, id=pk)
    serializer = BoardSerializer(board)
    return Response(serializer.data)


# @api_view(['GET'])      #board_top 조회수 기준으로 하는중.
# def get_TopBoards(request):
#     boards = Board.objects.filter(show__gte=25).order_by('-show')[0:5]
#     serializer = BoardSerializer(boards, many=True)
#     return Response(serializer.data)
@api_view(['GET'])      #annotate함수 사용, show와 like필드 모두 고려, 게시물 필터링.
def get_TopBoards(request):                                 #like엔 5배의 가중치 부여.
    boards = Board.objects.annotate(popularity=F('show')+5*F('like')).order_by('-popularity')[0:5]
    serializer = BoardSerializer(boards, many=True)
    return Response(serializer.data)





@api_view(['POST'])    #board_create
@permission_classes([IsAuthenticated])
def create_Board(request):
    user = User.objects.get(name=request.user)
    # request.user는 User모델의 id값을 가지고 있음
    # user = request.user
    # Check if the user exists in the User model
    # if not User.objects.filter(id=user.id).exists():
    #     return Response({'error': 'User does not exist'}, status=400)

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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def updateBoardImage(request, pk):
    board = Board.objects.get(id=pk)
    image_url = request.FILES.get('image_url')
    if image_url is not None:
        board.image_url = image_url
        board.save()
    serializer = BoardSerializer(board, many=False)
    return Response(serializer.data)




@api_view(['DELETE'])   #board_delete
@permission_classes([IsAuthenticated])
def delete_Board(request, pk):
    board = Board.objects.get(id=pk)
    board.delete()
    return Response('Board Deleted')





# @api_view(['POST'])  #board_upload
# def upload_Board(response, request):
#     data = response.data
    
#     board_id = data['board_id']
#     board = Board.objects.get(_id=board_id)

#     board.image = request.FILES.get('image')
#     board.save()

#     return Response('board was uploaded')