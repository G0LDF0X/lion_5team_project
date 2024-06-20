from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from app.models import Board, User, Reply, Interaction, Image_Tag
from app.serializer import BoardSerializer, ReplySerializer
from django.db.models import F
from datetime import datetime
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image as keras_image
import os
import numpy as np
import logging
from django.contrib.auth.decorators import login_required
from rest_framework import status
from io import BytesIO
from PIL import Image
import json
from transformers import TextClassificationPipeline, BertForSequenceClassification, AutoTokenizer
from django.utils import timezone
from django.core.cache import cache
from django.core.paginator import Paginator

logger = logging.getLogger(__name__)

@api_view(['GET'])
def get_Boards(request):
    page = request.query_params.get('page', 1)
    boards = Board.objects.all()
    paginator = Paginator(boards, 12)  # 12 boards per page
    paginated_boards = paginator.get_page(page)
    
    serializer = BoardSerializer(paginated_boards, many=True)
    
    return Response({
        'boards': serializer.data,
        'total_pages': paginator.num_pages,
        'current_page': paginated_boards.number
    })

def filter_reply(sentence):
    model_name = 'sgunderscore/hatescore-korean-hate-speech'
    model = BertForSequenceClassification.from_pretrained(model_name)
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    pipe = TextClassificationPipeline(
        model=model,
        tokenizer=tokenizer,
        device=-1,
        return_all_scores=True,
        function_to_apply='sigmoid'
    )
    results = pipe(sentence)[0]
    threshold = 0.3
    excluded_label = 'None'
    for result in results:
        if result['score'] > threshold and result['label'] != excluded_label:
            return False
    return True

@api_view(['GET', 'POST'])   
def board_detail_or_create_reply(request, pk):
    if request.method == 'GET':
        board = get_object_or_404(Board, id=pk)
        replies = Reply.objects.filter(board_id=board)
        print(request.user)
        if not request.user.is_anonymous:
            user = User.objects.get(username=request.user)
        if request.user.is_authenticated:   #로그인한 사용자가 게시물을 조회했을 때, 조회수를 추가합니다.
            board.show += 1
            Interaction.objects.create(user_id_id=user.id, content_type='board', content_id=board.id, interaction_type='view')
        board_serializer = BoardSerializer(board)
        board_data = board_serializer.data
        
        board_data['liked_by_user'] = Interaction.objects.filter(
            user_id_id=user.id, content_type='board', content_id=board.id, interaction_type='like'
        ).exists() if request.user.is_authenticated else False
        board_data['tags'] = Image_Tag.objects.filter(board_id=board.id).values('x', 'y', 'tag').all()
        
        reply_serializer = ReplySerializer(replies, many=True)
        
        return Response(
            {
                'board': board_data,
                'replies': reply_serializer.data
            }
        )
    elif request.method == 'POST':
#         # POST 요청에 대해 사용자가 로그인했는지 확인합니다.
        if not request.user.is_authenticated:
            return Response({'detail': 'Authentication credentials were not provided.'}, status=403)
        
        user = User.objects.get(username=request.user)
        board = Board.objects.get(id=pk)
        content = request.data.get('content', '')
        replied_id = int(request.data.get('replied_id', 0))
        reply = Reply.objects.create(user_id=user, board_id=board, content=content, replied_id=replied_id)
        if filter_reply(content):
            Interaction.objects.create(user_id_id=user.id, content_type='board', content_id=board.id, interaction_type='comment')
        serializer = ReplySerializer(reply)
        return Response(serializer.data)    

@api_view(['GET'])      #게시물 필터링.
def get_TopBoards(request):                  #like엔 5배의 가중치 부여.
    boards = Board.objects.annotate(popularity=F('show')+5*F('like')).order_by('-popularity')[0:5]
    serializer = BoardSerializer(boards, many=True)
    return Response(serializer.data)


def predict_image(board_image):
    MODEL_PATH = os.path.join(os.path.dirname(__file__), 'model.keras')
    model = load_model(MODEL_PATH)
    
    # Load the image from BytesIO
    img = Image.open(board_image)
    img = img.resize((64, 64))  # Resize the image to the target size
    img = keras_image.img_to_array(img)
    img = np.expand_dims(img, axis=0)
    result = model.predict(img)
    
    print(result)
    if result[0][0] == 1:
        prediction = 'dog'
    else:
        prediction = 'cat'

    return prediction

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_Board(request):
    try:
        user = User.objects.get(username=request.user)
        current_time = datetime.now()

        image_file = request.FILES.get('images')
        if image_file:
            print(f"Image file received: {image_file.name}")
            image_data = BytesIO(image_file.read())
            image_data.seek(0)
            prediction = predict_image(image_data)
        else:
            print("No image file received.")
            prediction = None

        print(f"Creating board for user: {user.username}")
        board = Board.objects.create(
            user_id=user,
            title=request.data.get('title', ''),
            content=request.data.get('content', ''),
            image_url=image_file,
            board_type=prediction,
            created_at=current_time
        )

        tags_data = json.loads(request.data.get('tags', '[]'))
        print(f"Tags received: {tags_data}")
        for tag in tags_data:
            Image_Tag.objects.create(
                board=board,
                x=tag['x'],
                y=tag['y'],
                tag=tag['tag']
            )

        serializer = BoardSerializer(board)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    except Exception as e:
        print(f"Error occurred: {e}")
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['PUT', 'DELETE'])
def handle_like(request, pk):
    print (request.user)    
    user = User.objects.get(username=request.user)
    board = get_object_or_404(Board, id=pk)

    if request.method == 'PUT':
        created = Interaction.objects.create(
            user_id_id=user.id, content_type='board', content_id=board.id, interaction_type='like'
        )
        if created:
            board.like += 1
            board.save(update_fields=['like'])
            return Response('like added')
    
    if request.method == 'DELETE':
        interaction = Interaction.objects.filter(
            user_id_id=user.id, content_type='board', content_id=board.id, interaction_type='like'
        ).first()
        if interaction:
            board.like -= 1
            board.save(update_fields=['like'])
            interaction.delete()
            return Response('like deleted')

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_Board(request, pk):

    # JSON 문자열로 전달된 userInfo를 로드
    user_info = json.loads(request.data.get('userInfo', '{}'))
    # board_data 초기화
    board_data = request.data.dict()
    image = request.FILES.get('image')

    print("Request Data:", request.data)
    try:
        board = Board.objects.get(id=pk)
    except Board.DoesNotExist:
        return Response({'detail': 'Board not found'}, status=404)
    

    print("Board User ID:", board.user_id.id)
    print("Request User ID:", user_info['id'])
    
    if board.user_id.id != user_info.get('id'):
        return Response({'detail': 'You do not have permission to edit this board'}, status=403)

    update_fields = []

     # 제목, 내용, 이미지 처리
    if 'title' in board_data:
        board.title = board_data['title']
        update_fields.append('title')
    if 'content' in board_data:
        board.content = board_data['content']
        update_fields.append('content')
    if image:
        board.image_url = image
        update_fields.append('image_url')

    # 기타 필드 처리
    for field in ['product_url', 'image_url']:
        if field in board_data:
            setattr(board, field, board_data[field])
            update_fields.append(field)

    if update_fields:
        board.save(update_fields=update_fields)
    else:
        board.save()

    serializer = BoardSerializer(board, many=False)
    return Response(serializer.data)



@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_Board(request, pk):
    board = Board.objects.get(id=pk)
    board.delete()
    return Response('Board Deleted')


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_Reply(request, pk):
    reply = Reply.objects.get(id=pk)
    reply.delete()
    return Response('Reply Deleted')



@api_view(['PUT'])
def update_Reply(request, pk):
    try:
        reply = Reply.objects.get(pk=pk)
    except Reply.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    reply.content = request.data.get('content', reply.content)
    reply.created_at = timezone.now()
    reply.isEdited = True
    reply.save()

    return Response(status=status.HTTP_200_OK)