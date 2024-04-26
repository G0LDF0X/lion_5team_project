from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.models import User_QnA, User_Answer
from rest_framework.permissions import IsAuthenticated
from app.serializer import UserQnASerializer, UserAnswerSerializer
from datetime import datetime

@api_view(['GET'])
def qna_board(request):
    questions = User_QnA.objects.all()
    question_serializer = UserQnASerializer(questions, many=True)  
    return Response(question_serializer.data)

@api_view(['GET'])
def qna_detail(request, pk):
    question = User_QnA.objects.get(pk=pk)
    question_serializer = UserQnASerializer(question)
    answers = User_Answer.objects.filter(user_qna_id=question)  
    answer_serializer = UserAnswerSerializer(answers, many=True)
    return Response({
        'question': question_serializer.data,
        'answers': answer_serializer.data
    })

@api_view(['POST'])
def create_user_qna(request):
    user = request.user
    current_time = datetime.now()
    qna_board = User_QnA.objects.create(
        user_id=user,
        title='',
        content='',
        image_url='',
        created_at=current_time
    )
    serializer = UserQnASerializer(qna_board, many=False)
    return Response(serializer.data)
    
@api_view(['PUT'])
def update_user_qna(request, pk):
    qna_board = User_QnA.objects.get(pk=pk)
    qna_board.title = request.data['title']
    qna_board.content = request.data['content'] 
    qna_board.image_url = request.data['image_url'] 
    qna_board.save()    

    serializer = UserQnASerializer(qna_board, many=False, data=request.data)

    return Response(serializer.data)


@api_view(['DELETE'])
def delete_user_qna(request, pk):
    qna_board = User_QnA.objects.get(pk=pk)
    qna_board.delete()
    return Response({"message": "Question deleted successfully"})


@api_view(['POST'])
def create_user_answer(request):
    user = request.user
    user_qna_id = request.data.get('user_qna_id')
    content = request.data.get('content')
    current_time = datetime.now()

    
    try:
        user_qna = User_QnA.objects.get(pk=user_qna_id)
    except User_QnA.DoesNotExist:
        return Response({"error": "Question does not exist"})

    user_answer = User_Answer.objects.create(user=user, user_qna=user_qna, content=content, created_at=current_time)

    serializer = UserAnswerSerializer(user_answer, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
def update_user_answer(request, pk):
    try:
        user_answer = User_Answer.objects.get(pk=pk)
    except User_Answer.DoesNotExist:
        return Response({"error": "Answer does not exist"})
    
    user_answer.content = request.data.get('content', user_answer.content)
    user_answer.save()
    
    serializer = UserAnswerSerializer(user_answer)
    return Response(serializer.data)

@api_view(['DELETE'])
def delete_user_answer(request, pk):
    try:
        user_answer = User_Answer.objects.get(pk=pk)
    except User_Answer.DoesNotExist:
        return Response({"error": "Answer does not exist"})
    
    user_answer.delete()
    return Response({"message": "Answer deleted successfully"})