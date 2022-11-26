from django.db import models
# from posts.models import Post
from boards.models import Board
from django.contrib.auth import get_user_model
User = get_user_model()

# Create your models here.
class Thread(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    # posts = models.ForeignKey(Post,null=True, on_delete=models.SET_NULL)
    board = models.ForeignKey(Board, null=True, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=50)
    # board = models.ForeignKey(Board)
