from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from dj_rest_auth.registration.views import LoginView, RegisterView
from rest_framework import permissions
from user.models import User, Post, Comment
from tellemgram.serializers import CustomUserSerializer, CustomLoginSerializer, CustomRegisterSerializer, UserVisibleSerializer, PostSerializer , CommentSerializer
from dj_rest_auth.views import PasswordChangeView, PasswordResetView
from rest_framework import status
import base64
from .permissions import IsSelfOrReadOnly
from django.shortcuts import get_object_or_404
from django.http import HttpResponseRedirect
from django.urls import reverse

class UserList(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserVisibleSerializer
    permission_classes = [IsAuthenticated]

class UserDetail(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated, IsSelfOrReadOnly]
    MAX_FILE_SIZE_MB = 10  # Specify the maximum file size limit in megabytes
    lookup_field = 'username'
    
    def create(self, request):
        try:
            # Retrieve the base64 string from the request data
            base64_string = request.data.get('profile_image', '')

            # Convert base64 string to binary data
            binary_data = base64.b64decode(base64_string)

            current_user = request.user
            uploaded_file = User(user=current_user, profile_image=binary_data)
            uploaded_file.save()

            response = 'O arquivo foi enviado com sucesso.'

            return Response(response, status=status.HTTP_201_CREATED)
        except Exception as e:
            # Handle exceptions appropriately
            print(e)
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

class CustomRegisterView(RegisterView):
    serializer_class = CustomRegisterSerializer
    permission_classes = [permissions.AllowAny]

class CustomLoginView(LoginView):
    serializer_class = CustomLoginSerializer
    permission_classes = [permissions.AllowAny]
    
class CustomPasswordChangeView(PasswordChangeView):
    def post(self, request, *args, **kwargs):
        old_password = request.data.get('old_password', None)

        # Verificar se a senha antiga está presente na requisição
        if old_password is None:
            return Response({'detail': 'A senha antiga não foi fornecida.'}, status=status.HTTP_400_BAD_REQUEST)

        # Adicione lógica para validar a senha antiga
        if not request.user.check_password(old_password):
            return Response({'detail': 'Senha antiga incorreta.'}, status=status.HTTP_400_BAD_REQUEST)

        return super().post(request, *args, **kwargs)
    
class CustomPasswordResetView(PasswordResetView):
    def post(self, request, *args, **kwargs):
        # Check if the provided email exists in the User model
        email = request.data.get('email')
        if User.objects.filter(email=email).exists():
            # If the email exists, proceed with the default behavior
            return super().post(request, *args, **kwargs)
        else:
            # If the email doesn't exist, return a Response with an error message
            return Response({'detail': 'User with this email does not exist.'}, status=status.HTTP_400_BAD_REQUEST)
        
class PostList(ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    # permission_classes = [IsSelfOrReadOnly]

def PostLike(request, pk):
    post = get_object_or_404(Post, id=request.POST.get('liked_posts'))
    if post.likes.filter(id=request.user.id).exists():
        post.likes.remove(request.user)
    else:
        post.likes.add(request.user)

    return HttpResponseRedirect(reverse('gpost-detail', args=[str(pk)]))

class PostDetail(RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsSelfOrReadOnly]

    def get_context_data(self, **kwargs):
        data = super().get_context_data(**kwargs)

        likes_connected = get_object_or_404(Post, id=self.kwargs['pk'])
        liked = False
        if likes_connected.likes.filter(id=self.request.user.id).exists():
            liked = True
        data['number_of_likes'] = likes_connected.number_of_likes()
        data['post_is_liked'] = liked
        return data

class CommentList(ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class CommentDetail(RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class UserPostList(ListCreateAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        username = self.kwargs['username']
        user = User.objects.get(username=username)
        return Post.objects.filter(user=user)

# class CustomUploadViewSet(viewsets.ViewSet):
#     permission_classes = [IsAuthenticated]
#     serializer_class = CustomUserImage
#     MAX_FILE_SIZE_MB = 10  # Specify the maximum file size limit in megabytes

#     def list(self, request):
#         try:
#             # Check if a specific user is specified in the request parameters
#             user_id = request.query_params.get('user_id')

#             if user_id:
#                 # List images for a specific user
#                 #user = get_object_or_404(User, id=user_id)
#                 user_images = UserImage.objects.filter(user=user_id)
#             else:
#                 # List images for all users
#                 user_images = UserImage.objects.all()

#             serializer = CustomUserImage(user_images, many=True)
#             return Response(serializer.data)
#         except Exception as e:
#             # Handle exceptions appropriately
#             return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
#     def create(self, request):
#         try:
#             # Retrieve the base64 string from the request data
#             base64_string = request.data.get('image', '')

#             # Convert base64 string to binary data
#             binary_data = base64.b64decode(base64_string)

#             current_user = request.user

#             # Check if the user already has an image, and delete it
#             try:
#                 existing_image = UserImage.objects.get(user=current_user)
#                 existing_image.delete()
#             except UserImage.DoesNotExist:
#                 pass  # If no existing image, do nothing

#             # Save the new user image
#             uploaded_file = UserImage(user=current_user, image=binary_data)
#             uploaded_file.save()

#             response = 'O arquivo foi enviado com sucesso.'

#             return Response(response, status=status.HTTP_201_CREATED)
#         except Exception as e:
#             # Handle exceptions appropriately
#             print(e)
#             return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
        
