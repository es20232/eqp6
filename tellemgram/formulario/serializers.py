from rest_framework import serializers
from demoapp.models import User
from rest_framework.serializers import Serializer, FileField

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'full_name', 'email', 'senha')
        #obs: a senha utilizada ilustra apenas um exemplo, ela não será guardada como string
        # fields = ('id' ,'title', 'description', 'completed')

# Serializers define the API representation.
class UploadSerializer(Serializer):
    file_uploaded = FileField()
    class Meta:
        fields = ['file_uploaded']