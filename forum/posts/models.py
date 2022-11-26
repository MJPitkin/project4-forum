from django.db import models
from threads.models import Thread
from django.contrib.auth import get_user_model
User = get_user_model()


class Post(models.Model):
        author = models.ForeignKey(User,null=True, on_delete=models.SET_NULL)
        content = models.TextField()
        thread = models.ForeignKey(Thread,null=True, on_delete=models.CASCADE)
        created_at = models.DateTimeField(auto_now_add=True)
        edited_at = models.DateTimeField(auto_now=True)

# Create your models here.
