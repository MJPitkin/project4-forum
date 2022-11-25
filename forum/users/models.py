from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class CustomUser(AbstractUser):
    # username = models.TextField(unique=True)
    # email = models.EmailField()
    # password = models.TextField()
    # is_admin = models.BooleanField(null=True)
    rating = models.CharField(null=True,max_length=10)
