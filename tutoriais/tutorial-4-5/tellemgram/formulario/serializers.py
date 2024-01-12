from rest_framework import serializers
from demoapp.models import User, UploadedFile
from dj_rest_auth.serializers import UserDetailsSerializer
from django.conf import settings

from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email

from dj_rest_auth.registration.serializers import RegisterSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'name', 'surname', 'email')
        #obs: a senha utilizada ilustra apenas um exemplo, ela não será guardada como string
        # fields = ('id' ,'title', 'description', 'completed')

# Serializers define the API representation.
# class UploadSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UploadedFile
#         fields = ['file_content', 'content_type']

class CustomRegisterSerializer(RegisterSerializer):
    # username = serializers.CharField(max_length=15)
    name = serializers.CharField(max_length=50)
    surname = serializers.CharField(max_length=50)
    # email = serializers.CharField(max_length=30)

    def get_cleaned_data(self):
        data_dict = super().get_cleaned_data()
        # data_dict['username'] = self.validated_data.get('username', '')
        data_dict['name'] = self.validated_data.get('name', '')
        data_dict['surname'] = self.validated_data.get('surname', '')
        # data_dict['email'] = self.validated_data.get('email', '')
        return data_dict

class CustomUserDetailsSerializer(UserDetailsSerializer):

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + \
            ('name', 'surname')