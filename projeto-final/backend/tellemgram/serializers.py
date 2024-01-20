from rest_framework import serializers
from user.models import User, UserImage
from dj_rest_auth.serializers import UserDetailsSerializer
from django.conf import settings
from rest_framework.serializers import Serializer, FileField

from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email


from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import LoginSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'name', 'surname', 'email')

class UserVisibleSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'name', 'surname')

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

class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ('id', 'username', 'name', 'surname', 'email', 'password')
        read_only_fields = ('id',)

    def create(self, validated_data):
        # Custom logic to create a user with a hashed password
        password = validated_data.pop('password', None)
        user = User.objects.create(**validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user

    def update(self, instance, validated_data):
        # Custom logic to update a user with a hashed password
        password = validated_data.pop('password', None)
        instance = super().update(instance, validated_data)
        if password:
            instance.set_password(password)
            instance.save()
        return instance

class CustomUserImage(serializers.ModelSerializer):
    class Meta:
        model = UserImage
        fields = ('image', 'description', 'is_published')

