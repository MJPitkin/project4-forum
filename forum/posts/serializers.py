from rest_framework import serializers
from .models import Post
from threads.models import Thread

class PostSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        # used for getting the thread ID from the fetch URL, requires fetch path to be boards/boardidnumber/threads/threadidnumber/posts
        thread_id = self.context["request"].get_full_path().split("/")[4]
        thread = Thread.objects.get(pk=thread_id)
        post = Post.objects.create(**validated_data, thread = thread)
        return post

    class Meta:
        model = Post
        fields = ('id','author','content','thread','created_at','edited_at',)