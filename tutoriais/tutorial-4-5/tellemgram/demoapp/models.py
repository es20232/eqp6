from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=15)
    full_name = models.CharField(max_length=50)
    email = models.CharField(max_length=30, unique=True)
    senha = models.CharField(max_length=15)
    
class UploadedFile(models.Model):
    file_content = models.BinaryField()
    content_type = models.CharField(max_length=255)

class Item(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.TextField()

    def __str__(self):
        return self.nome