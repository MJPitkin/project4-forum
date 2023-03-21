from django.db import models
# from threads.models import Thread

class Board(models.Model):
    topic = models.CharField(max_length=30)
    # threads = models.ForeignKey(Thread, null=True, on_delete=models.CASCADE)
# Create your models here.
