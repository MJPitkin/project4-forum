from django.shortcuts import render, get_object_or_404
from rest_framework import generics, permissions
from .models import Post
from threads.models import Thread
from .serializers import PostSerializer
# Create your views here.


class PostListCreate(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    # def get(self, request, *args, **kwargs):
    #     return self.list(request, *args, **kwargs)

    def get_queryset(self):
        self.thread_id = get_object_or_404(Thread, id=self.kwargs['thread_id'])
        return Post.objects.filter(thread=self.thread_id)

    def post(self, request, *args, **kwargs):
        # self.thread_id = get_object_or_404(Thread, id=self.kwargs['thread_id'])
        return self.create(request, *args, **kwargs)


class PostRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
