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