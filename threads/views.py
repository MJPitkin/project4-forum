from django.shortcuts import render, get_object_or_404
from rest_framework import generics
from rest_framework import permissions
from .models import Thread
from boards.models import Board
from .serializers import ThreadSerializer
import json
# Create your views here.

class ThreadListCreate(generics.ListCreateAPIView):
    queryset = Thread.objects.all()
    serializer_class = ThreadSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    # def get(self, request, *args, **kwargs):
    #     return self.list(request, *args, **kwargs)

    def get_queryset(self):
        self.board_id = get_object_or_404(Board, id=self.kwargs['board_id'])
        return Thread.objects.filter(board=self.board_id)

    def post(self, request, *args, **kwargs):
        # print(json.loads(request.user.id))
        return self.create(request, *args, **kwargs)

class ThreadRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Thread.objects.all()
    serializer_class = ThreadSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
