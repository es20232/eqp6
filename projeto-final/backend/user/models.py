from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    # name = models.CharField(max_length=50)
    # surname = models.CharField(max_length=50)
    profile_image = models.BinaryField(null=True, blank=True)
    email = models.EmailField(
        unique=True,
        blank=True
    )

class UserImage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.BinaryField()
    description = models.TextField()
    is_published = models.BooleanField(default=False)

# class UploadedFile(models.Model):
#     file_content = models.BinaryField()
#     content_type = models.CharField(max_length=255)
