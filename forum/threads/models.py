from django.db import models
# from posts.models import Post
from users.models import CustomUser
from boards.models import Board

# Create your models here.
class Thread(models.Model):
    author = models.ForeignKey(CustomUser,null=True, on_delete=models.SET_NULL)
    # posts = models.ForeignKey(Post,null=True, on_delete=models.SET_NULL)
    board = models.ForeignKey(Board, null=True, on_delete=models.CASCADE)
    created_at = models.DateTimeField()
    title = models.CharField(max_length=50)
    # board = models.ForeignKey(Board)
