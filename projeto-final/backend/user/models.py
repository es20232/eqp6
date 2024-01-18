from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    name = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)

class UploadedFile(models.Model):
    file_content = models.BinaryField()
    content_type = models.CharField(max_length=255)
