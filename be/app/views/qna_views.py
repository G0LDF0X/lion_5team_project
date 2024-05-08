from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from app.models import User_QnA, User_Answer, User
from rest_framework.permissions import IsAuthenticated
from app.serializer import UserQnASerializer, UserAnswerSerializer
from datetime import datetime
from django.core.files.images import ImageFile

@api_view(['GET'])
def qna_board(request):
    questions = User_QnA.objects.all()
    question_serializer = UserQnASerializer(questions, many=True)  
    return Response(question_serializer.data)

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


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_user_qna(request):
    user = User.objects.get(username=request.user)

    image_file = request.FILES.get('image_url', None)
    if image_file:
        image_file = ImageFile(image_file)

    qna_board = User_QnA.objects.create(
        user_id=user,
        title=request.data.get('title', ''),
        content=request.data.get('content', ''),
        image_url=image_file,
    )
    serializer = UserQnASerializer(qna_board, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_user_answer(request, pk):
    user = User.objects.get(username=request.user)
    qna = User_QnA.objects.get(id=pk)
    current_time = datetime.now()

    qna_board = User_Answer.objects.create(
        user_id=user,
        title=request.data.get('title', ''),
        content=request.data.get('content', ''),
        user_qna_id=qna,
        created_at=current_time,
    )
    serializer = UserAnswerSerializer(qna_board, many=False)
    return Response(serializer.data)
    

@api_view(['PUT'])
def uploadImage(request, pk):
    qna = User_QnA.objects.get(id=pk)
    qna.image_url = request.FILES.get('file')
    qna.save()
    return Response('Image was uploaded')
    
    
@api_view(['PUT'])
def update_user_qna(request, pk):
    qna_board = User_QnA.objects.get(id=pk)
    qna_board.title = request.data['title']
    qna_board.content = request.data['content'] 
    qna_board.save()    

    serializer = UserQnASerializer(qna_board, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
def delete_user_qna(request, pk):
    qna_board = User_QnA.objects.get(pk=pk)
    qna_board.delete()
    return Response({"message": "Question deleted successfully"})

@api_view(['PUT'])
def update_user_qna(request, pk):
    qna_board = User_QnA.objects.get(id=pk)
    qna_board.title = request.data['title']
    qna_board.content = request.data['content'] 
    qna_board.save()    

    serializer = UserQnASerializer(qna_board, many=False)
    return Response(serializer.data)

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