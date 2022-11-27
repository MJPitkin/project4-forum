from rest_framework import serializers
from .models import Thread
from boards.models import Board

class ThreadSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        # used for getting the board ID from the fetch URL, requires fetch path to be boards/idnumberhere/threads
        board_id = self.context["request"].get_full_path().split("/")[2]
        board = Board.objects.get(pk=board_id)
        thread = Thread.objects.create(**validated_data, board=board)
        return thread
    class Meta:
        model = Thread
        fields = ('id','author','board','created_at','title',)