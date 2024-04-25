from rest_framework import serializers
from .models import *

class BoardSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField(read_only=True)
    content = serializers.SerializerMethodField(read_only=True)
    product_url = serializers.SerializerMethodField(read_only=True)
    image_url = serializers.SerializerMethodField(read_only=True)
    show = serializers.SerializerMethodField(read_only=True)
    like = serializers.SerializerMethodField(read_only=True)
    created_at = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Board
        fields = '__all__'