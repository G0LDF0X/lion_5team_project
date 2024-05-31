from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from app.models import Board, User, Reply
from app.serializer import BoardSerializer, ReplySerializer
from django.db.models import F
from datetime import datetime

@api_view(['GET'])
def get_Boards(request):
    boards = Board.objects.all()

    serializer = BoardSerializer(boards, many=True)
    return Response(serializer.data)



# @api_view(['GET'])   
# def get_Board(request, pk):
#     board = get_object_or_404(Board, id=pk)
#     replies = Reply.objects.filter(board_id=board)

#     board_serializer = BoardSerializer(board)
#     reply_serializer = ReplySerializer(replies, many=True)
    
#     return Response(
#         {
#             'board': board_serializer.data,
#             'replies': reply_serializer.data
#         }
#     )


@api_view(['GET', 'POST'])   
def board_detail_or_create_reply(request, pk):
    if request.method == 'GET':
        board = get_object_or_404(Board, id=pk)
        replies = Reply.objects.filter(board_id=board)

        board_serializer = BoardSerializer(board)
        reply_serializer = ReplySerializer(replies, many=True)
        
        return Response(
            {
                'board': board_serializer.data,
                'replies': reply_serializer.data
            }
        )
    elif request.method == 'POST':
        # POST 요청에 대해 사용자가 로그인했는지 확인합니다.
        if not request.user.is_authenticated:
            return Response({'detail': 'Authentication credentials were not provided.'}, status=403)
        
        user = User.objects.get(username=request.user)
        board = Board.objects.get(id=pk)
        content = request.data.get('content', '')
        replied_id = request.data.get('replied_id', 0)
        reply = Reply.objects.create(user_id=user, board_id=board, content=content, replied_id=replied_id)
        serializer = ReplySerializer(reply)
        return Response(serializer.data)
    

@api_view(['GET'])      #게시물 필터링.
def get_TopBoards(request):                  #like엔 5배의 가중치 부여.
    boards = Board.objects.annotate(popularity=F('show')+5*F('like')).order_by('-popularity')[0:5]
    serializer = BoardSerializer(boards, many=True)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_Board(request):
    user = User.objects.get(username=request.user)
    current_time = datetime.now()
    board = Board.objects.create(
        user_id=user,
        title=request.data.get('title', ''),
        content=request.data.get('content', ''),
        image_url=request.data.get('image_url', ''),
        product_url=request.data.get('product_url', ''),
        show=0,
        like=0,
    )
    serializer = BoardSerializer(board, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def add_show(request, pk):
    board = Board.objects.get(id=pk)
    board.show += 1
    board.save(update_fields=['show'])
    return Response('show added')    


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


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def create_Reply(request, pk):
#     try:
#         user = User.objects.get(username=request.user)
#         board = Board.objects.get(id=pk)
#         reply = Reply.objects.create(
#             user_id=user,
#             board_id=board,
#             content=request.data['reply'],
#             replied_id=0
#         )
#         print("Created Reply:", reply)  # Debugging print statement
#         serializer = ReplySerializer(reply)
#         print("Serialized Data:", serializer.data)  # Debugging print statement
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     except User.DoesNotExist:
#         return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
#     except Board.DoesNotExist:
#         return Response({'error': 'Board not found'}, status=status.HTTP_404_NOT_FOUND)
#     except Exception as e:
#         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)