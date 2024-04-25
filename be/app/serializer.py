from rest_framework import serializers
from .models import *

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'

    def get_reviews(self, obj):
        return obj.review_set.all()
    
    def get_qna(self, obj):
        return obj.qna_set.all()
    


class UserQnASerializer(serializers.ModelSerializer):
    class Meta:
        model = User_QnA
        fields = '__all__'  
    
    def get_qna(self, obj):
        return obj.qna_set.all()
    

class UserAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Answer
        fields = '__all__'

    def get_user_qna(self, obj):
        return obj.user_qna_set.all()
    
    def get_user_answer(self, obj):
        return obj.user_answer_set.all()
    
    def get_user(self, obj):
        return obj.user.username