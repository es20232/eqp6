from rest_framework import serializers
from user.models import User, Post , Comment
from dj_rest_auth.serializers import UserDetailsSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import LoginSerializer


class UserVisibleSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('user_id','username', 'first_name', 'last_name', 'profile_image')

class CustomRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(max_length=50)
    last_name = serializers.CharField(max_length=50)

    def get_cleaned_data(self):
        data_dict = super().get_cleaned_data()
        data_dict['first_name'] = self.validated_data.get('first_name', '')
        data_dict['last_name'] = self.validated_data.get('last_name', '')
        return data_dict

class CustomUserDetailsSerializer(UserDetailsSerializer):
    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + ('first_name', 'last_name')

class CustomLoginSerializer(LoginSerializer):
    email = None

    def get_cleaned_data(self):
        data_dict = super().get_cleaned_data()
        user = self.user

        # Ajuste para acessar o campo de identificação primária correto
        data_dict['user_id'] = user.user_id if hasattr(user, 'user_id') else user.id

        return data_dict

class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password', 'profile_image')
        read_only_fields = ('email',)

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

class PostSerializer(serializers.ModelSerializer):
    # likes_count = serializers.SerializerMethodField()
    number_of_likes = serializers.IntegerField(source='likes.count', read_only=True)
    number_of_dislikes = serializers.IntegerField(source='dislikes.count', read_only=True)
    number_of_comments = serializers.IntegerField(source='comments.count', read_only=True)
    class Meta:
        model = Post
        fields = '__all__'
        # exclude = ('user',)  # Exclui o campo 'user' da serialização
    def get_likes(self, obj):
        return obj.number_of_likes()
    
class CustomPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('post_id', 'post_image', 'caption')

class CommentSerializer(serializers.ModelSerializer):
    number_of_likes = serializers.IntegerField(source='likes.count', read_only=True)
    number_of_dislikes = serializers.IntegerField(source='dislikes.count', read_only=True)
    class Meta:
        model = Comment
        fields = '__all__'



