from rest_framework import serializers
from user.models import User, UploadedFile
from dj_rest_auth.serializers import UserDetailsSerializer
from django.conf import settings

from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email

from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import LoginSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'name', 'surname', 'email')

class CustomRegisterSerializer(RegisterSerializer):
    name = serializers.CharField(max_length=50)
    surname = serializers.CharField(max_length=50)

    def get_cleaned_data(self):
        data_dict = super().get_cleaned_data()
        data_dict['name'] = self.validated_data.get('name', '')
        data_dict['surname'] = self.validated_data.get('surname', '')
        return data_dict

class CustomUserDetailsSerializer(UserDetailsSerializer):
    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + ('name', 'surname')

class CustomLoginSerializer(LoginSerializer):
    email = None

    def get_cleaned_data(self):
        data_dict = super().get_cleaned_data()
        return data_dict