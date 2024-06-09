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
# from transformers import TextClassificationPipeline, BertForSequenceClassification, AutoTokenizer
logger = logging.getLogger(__name__)

# @api_view(['POST'])




# def filter_reply(sententce):
#     model_name = 'sgunderscore/hatescore-korean-hate-speech'
#     model = BertForSequenceClassification.from_pretrained(model_name)
#     tokenizer = AutoTokenizer.from_pretrained(model_name)
#     pipe = TextClassificationPipeline(
#             model=model,
#             tokenizer=tokenizer,
#             device=0,
#             return_all_scores=True,
#             function_to_apply='sigmoid'
#     )
#     results = pipe(sentence)[0]
#     threshold = 0.3
#     excluded_label = 'None'
#     for result in results:
#         if result['score'] > threshold and result['label'] != excluded_label:
#             print(result)



@api_view(['GET'])
def get_Boards(request):
    boards = Board.objects.all()

    serializer = BoardSerializer(boards, many=True)
    return Response(serializer.data)

@api_view(['GET', 'POST'])   
def board_detail_or_create_reply(request, pk):
    if request.method == 'GET':
        board = get_object_or_404(Board, id=pk)
        replies = Reply.objects.filter(board_id=board)
        user = User.objects.get(username=request.user)
        if request.user.is_authenticated:   #로그인한 사용자가 게시물을 조회했을 때, 조회수를 추가합니다.
            board.show += 1
            Interaction.objects.create(user_id_id=user.id, content_type='board', content_id=board.id, interaction_type='view')
        board_serializer = BoardSerializer(board)
        board_data = board_serializer.data
        
        board_data['liked_by_user'] = Interaction.objects.filter(
            user_id_id=user.id, content_type='board', content_id=board.id, interaction_type='like'
        ).exists() if request.user.is_authenticated else False
        
        reply_serializer = ReplySerializer(replies, many=True)
        
        return Response(
            {
                'board': board_data,
                'replies': reply_serializer.data
            }
        )
        board_serializer = BoardSerializer(board )
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
        Interaction.objects.create(user_id_id=user.id, content_type='board', content_id=board.id, interaction_type='comment')
        serializer = ReplySerializer(reply)
        return Response(serializer.data)
    

@api_view(['GET'])      #게시물 필터링.
def get_TopBoards(request):                  #like엔 5배의 가중치 부여.
    boards = Board.objects.annotate(popularity=F('show')+5*F('like')).order_by('-popularity')[0:5]
    serializer = BoardSerializer(boards, many=True)
    return Response(serializer.data)


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def create_Board(request):
#     try:
#         user = request.user

#         current_time = datetime.now()
#         board = Board.objects.create(
#             user_id=user.id,
#             title=request.data.get('title', ''),
#             content=request.data.get('content', ''),
#             image_url=request.data.get('images'),
#             type=predict_image(request.data.get('images')),
#             tag=request.data.get('tag', ''),
#             created_at=current_time
#         
#         serializer = BoardSerializer(board, many=False)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     except Exception as e:
#         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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

        # Handle image file
        image_file = request.FILES.get('images')
        if image_file:
            print(f"Image file received: {image_file.name}")
            image_data = BytesIO(image_file.read())
            image_data.seek(0)  # Make sure the file pointer is at the start
            prediction = predict_image(image_data)
        else:
            print("No image file received.")
            prediction = None

        # Create the board
        print(f"Creating board for user: {user.username}")
        board = Board.objects.create(
            user_id=user,
            title=request.data.get('title', ''),
            content=request.data.get('content', ''),
            image_url=image_file,  # Use the actual uploaded file
            board_type=prediction,
            created_at=current_time
        )

        # Handle tags
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

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def create_Board(request):
#     try:
#         user = User.objects.get(username=request.user)
#         current_time = datetime.now()

#         # Create the board
#         board = Board.objects.create(
#             user_id_id=user.id,
#             title=request.data.get('title', ''),
#             content=request.data.get('content', ''),
#             board_type=request.data.get('board_type', ''),
#             created_at=current_time
#         )

#         # Handle images and tags
#         images_data = request.FILES.getlist('images')
#         tags_data = json.loads(request.data.get('tags', '[]'))

#         for idx, image_file in enumerate(images_data):
#             image = Image.objects.create(board=board, image_url=image_file)
#             image_tags = [tag for tag in tags_data if tag['imageIndex'] == idx]
#             for tag in image_tags:
#                 Image_Tag.objects.create(
#                     board=board,
#                     image=image,
#                     x=tag['x'],
#                     y=tag['y'],
#                     tag=tag['tag']
#                 )

#         serializer = BoardSerializer(board)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)

#     except Exception as e:
#         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['PUT', 'DELETE'])
def handle_like(request, pk):
    print (request.user)    
    user = User.objects.get(username=request.user)
    board = get_object_or_404(Board, id=pk)

    if request.method == 'PUT':
        interaction, created = Interaction.objects.get_or_create(
            user_id=user, content_type='board', content_id=board.id, interaction_type='like'
        )
        if created:
            board.like += 1
            board.save(update_fields=['like'])
            return Response('like added', status=status.HTTP_201_CREATED)
        else:
            return Response('user already liked this post', status=status.HTTP_200_OK)
    
    if request.method == 'DELETE':
        interaction = Interaction.objects.filter(
            user_id=user, content_type='board', content_id=board.id, interaction_type='like'
        ).first()
        if interaction:
            board.like -= 1
            board.save(update_fields=['like'])
            interaction.delete()
            return Response('like deleted', status=status.HTTP_204_NO_CONTENT)
        else:
            return Response('like not found', status=status.HTTP_404_NOT_FOUND)

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

