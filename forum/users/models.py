from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class CustomUser(AbstractUser):
    username = models.CharField(unique=True, max_length=30)
    email = models.EmailField()
    password = models.CharField(max_length=30)
    is_admin = models.BooleanField()
