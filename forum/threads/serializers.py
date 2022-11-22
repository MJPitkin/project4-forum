from rest_framework import serializers
from .models import Thread

class ThreadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thread
        fields = ('author','board','created_at','title',)