from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from app.models import Interaction, Board, Item, User
from app.serializer import InteractionSerializer, BoardSerializer, ItemSerializer

@api_view(['POST'])
def track_interaction(request):
    serializer = InteractionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def view_item(request, item_id):
    item = get_object_or_404(Item, pk=item_id)
    Interaction.objects.create(user_id=request.user, content_type='item', content_id=item.id, interaction_type='view', stay_time=request.data.get('stay_time', None))
    serializer = ItemSerializer(item)
    return Response(serializer.data)

@api_view(['GET'])
def view_board(request, board_id):
    board = get_object_or_404(Board, pk=board_id)
    Interaction.objects.create(user_id=request.user, content_type='board', content_id=board.id, interaction_type='view', stay_time=request.data.get('stay_time', None))
    serializer = BoardSerializer(board)
    return Response(serializer.data)

@api_view(['POST'])
def like_board(request, board_id):
    board = get_object_or_404(Board, pk=board_id)
    user = User.objects.get(username=request.user)
    Interaction.objects.create(user_id=user.id, content_type='board', content_id=board.id, interaction_type='like')
    board.like += 1
    board.save()
    return Response({'status': 'liked'})
@api_view(['POST'])
def search_item(request):
    print (request.user)
    user = User.objects.get(username=request.user)
    query = request.data.get('query')
    Interaction.objects.create(user_id=user.id, content_type='item', interaction_type='search', search_query=query)
