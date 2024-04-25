from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.models import User_QnA, User_Answer
from app.serializer import UserQnASerializer, UserAnswerSerializer  

@api_view(['GET'])
def qna_board(request):
    questions = User_QnA.objects.all()
    question_serializer = UserQnASerializer(questions, many=True)  
    return Response(question_serializer.data)

@api_view(['GET'])
def qna_detail(request, pk):
    question = User_QnA.objects.get(pk=pk)
    question_serializer = UserQnASerializer(question)
    answers = User_Answer.objects.filter(question=question)
    answer_serializer = UserAnswerSerializer(answers, many=True)
    return Response({
        'question': question_serializer.data,
        'answers': answer_serializer.data
    })