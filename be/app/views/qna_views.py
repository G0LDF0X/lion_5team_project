from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from app.models import User_QnA, User_Answer, User
from rest_framework.permissions import IsAuthenticated
from app.serializer import UserQnASerializer, UserAnswerSerializer
from datetime import datetime
from django.core.files.images import ImageFile
import json
from django.core.cache import cache

@api_view(['GET'])
def qna_board(request):
    questions = User_QnA.objects.all()
    question_serializer = UserQnASerializer(questions, many=True)  
    return Response(question_serializer.data)

# @api_view(['GET'])
# def qna_board(request):
#     cache_key = 'all_questions'
#     data = cache.get(cache_key)

#     if not data:
#         questions = User_QnA.objects.all()
#         question_serializer = UserQnASerializer(questions, many=True)
#         data = question_serializer.data

#         cache.set(cache_key, data, 600)  # 캐시 유효 시간을 10분으로 설정

#     return Response(data)

@api_view(['GET'])
def qna_detail(request, pk):
    question = User_QnA.objects.get(id=pk)
    question_serializer = UserQnASerializer(question)
    answers = User_Answer.objects.filter(user_qna_id_id=pk)
    answer_serializer = UserAnswerSerializer(answers, many=True)
    return Response({
        'question': question_serializer.data,
        'answers': answer_serializer.data
    })

@api_view(['GET'])
def get_user_qna(request, pk):
    try:
        user = User.objects.get(id=pk)
        qnas = User_QnA.objects.filter(user_id=user)
        serializer = UserQnASerializer(qnas, many=True)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response({"detail": "User not found"}, status=404)
    except Exception as e:
        return Response({"detail": str(e)}, status=500)
    

@api_view(['GET'])
def get_user_answers(request, pk):
    try:
        user = User.objects.get(id=pk)
        answers = User_Answer.objects.filter(user_id=user)
        serializer = UserAnswerSerializer(answers, many=True)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response({"detail": "User not found"}, status=404)
    except Exception as e:
        return Response({"detail": str(e)}, status=500)

@api_view(['POST'])
def create_user_qna(request):
    user = User.objects.get(username=request.user)
    qna_board = User_QnA.objects.create(
        user_id_id=user.id,
        title='',
        content='',
        created_at=datetime.now(),
    )
    serializer = UserQnASerializer(qna_board, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_user_answer(request, pk):
    user = User.objects.get(username=request.user)
    qna = User_QnA.objects.get(id=pk)
    data = request.data
    current_time = datetime.now()

    qna_board = User_Answer.objects.create(
        user_id=user,
        title=data['title'],
        content=data['content'],
        user_qna_id=qna,
    )
    serializer = UserAnswerSerializer(qna_board, many=False)
    return Response(serializer.data)
    

@api_view(['POST'])
def uploadImage(request, pk):
    try:
        qna = User_QnA.objects.get(id=pk)
        if 'file' in request.FILES:
            qna.image_url = request.FILES['file']
            qna.save()
            return Response({'url': qna.image_url.url}, status=200)
        else:
            return Response({'error': 'No file provided'}, status=400)
    except User_QnA.DoesNotExist:
        return Response({'error': 'QnA not found'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=500)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_user_qna(request, pk):
    qna_board = User_QnA.objects.get(id=pk)
    qna_board.delete()
    return Response({"message": "Question deleted successfully"})

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user_qna(request, pk):
    try:
        
        user = User.objects.get(username=request.user)
        # Get the User_QnA instance
        user_qna = User_QnA.objects.get(id=pk)

        # Check permissions
        print(request.data)
        if user_qna.user_id.id != user.id:
            return Response({'detail': 'You do not have permission to edit this qna'}, status=403)
        data = request.data
        user_qna.title = data.get('title')
        user_qna.content = data.get('content')
        user_qna.save()

        serializer = UserQnASerializer(user_qna, many=False)
        return Response(serializer.data)

    except User_QnA.DoesNotExist:
        return Response({'detail': 'User_QnA not found'}, status=404)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user_answer(request, pk):
    try:
        user_answer_list = User_Answer.objects.filter(user_qna_id_id=pk)
    except User_Answer.DoesNotExist:
        return Response({"error": "Answer does not exist"})
    user = User.objects.get(username=request.user)
    user_answers = user_answer_list.filter(user_id=user)
    for user_answer in user_answers:
        user_answer.title = request.data['title']
        user_answer.content = request.data['content']
        user_answer.save()

    serializer = UserAnswerSerializer(user_answers, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
def delete_user_answer(request, pk):
    try:
        user_answer = User_Answer.objects.get(pk=pk)
    except User_Answer.DoesNotExist:
        return Response({"error": "Answer does not exist"})
    
    user_answer.delete()
    return Response({"message": "Answer deleted successfully"})