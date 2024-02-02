from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    email = models.EmailField(
        unique=True,
        blank=True
    )
    profile_image = models.BinaryField(blank=True, null=True, editable = True)
