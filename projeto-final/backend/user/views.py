from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from dj_rest_auth.registration.views import LoginView, RegisterView
from rest_framework import permissions
from user.models import User, Post, Comment
from tellemgram.serializers import (
    CustomUserSerializer, CustomLoginSerializer, CustomRegisterSerializer, 
    UserVisibleSerializer, PostSerializer, CustomPostSerializer,
    CommentSerializer )
from dj_rest_auth.views import PasswordChangeView, PasswordResetView
from rest_framework import status
import base64
from .permissions import IsSelfOrReadOnly, IsPostOwnerOrReadOnly
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes

class UserListView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserVisibleSerializer
    permission_classes = [IsAuthenticated]

class UserDetailView(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated, IsSelfOrReadOnly]
    MAX_FILE_SIZE_MB = 10  # Specify the maximum file size limit in megabytes
    lookup_field = 'username'
    
    def create(self, request, *args, **kwargs):
        try:
            # Retrieve the base64 string from the request data
            base64_string = request.data.get('profile_image', '')

            # Convert base64 string to binary data
            binary_data = base64.b64decode(base64_string)

            current_user = request.user
            current_user.profile_image = binary_data
            current_user.save()

            response = 'O arquivo foi enviado com sucesso.'

            return Response(response, status=status.HTTP_201_CREATED)
        except Exception as e:
            # Handle exceptions appropriately
            print(e)
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

class UserDetailIDView(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated, IsSelfOrReadOnly]
    MAX_FILE_SIZE_MB = 10  # Specify the maximum file size limit in megabytes
    
    def create(self, request, *args, **kwargs):
        try:
            # Retrieve the base64 string from the request data
            base64_string = request.data.get('profile_image', '')

            # Convert base64 string to binary data
            binary_data = base64.b64decode(base64_string)

            current_user = request.user
            current_user.profile_image = binary_data
            current_user.save()

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
        
class PostListView(ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Post.objects.all()

        # Order by creation time (default order)
        queryset = queryset.order_by('-created_at')

        # Filter by the number of posts requested (default: all)
        n = self.request.query_params.get('n')
        if n is not None:
            try:
                n = int(n)
                queryset = queryset[:n]
            except ValueError:
                pass  # Handle the case when 'n' is not an integer

        return queryset

# class PostCreateView(CreateAPIView):
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer
#     permission_classes = [IsAuthenticated]

#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)
    
class PostDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsPostOwnerOrReadOnly, IsAuthenticated]

    def get_context_data(self, **kwargs):
        data = super().get_context_data(**kwargs)

        likes_connected = get_object_or_404(Post, post_id=self.kwargs['pk'])
        liked = False
        if likes_connected.likes.filter(post_id=self.request.user.id).exists():
            liked = True
        data['number_of_likes'] = likes_connected.number_of_likes()
        data['post_is_liked'] = liked
        return data

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_post(request, post_id):
    user = request.user
    post = get_object_or_404(Post, post_id=post_id)

    # Verifica se o usuário já curtiu o post
    # if user in post.likes.all():
    #     post.likes.remove(user)
    #     return Response({"detail": "Like removido com sucesso."}, status=status.HTTP_200_OK)
    # elif user in post.dislikes.all():
    #     post.dislikes.remove(user)
    # Adiciona o usuário aos likes do post
    post.likes.add(user)
    post.save()

    return Response({"detail": "Post curtido com sucesso."}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def dislike_post(request, post_id):
    user = request.user
    post = get_object_or_404(Post, post_id=post_id)

    # Verifica se o usuário já curtiu o post
    # if user in post.dislikes.all():
    #     post.dislikes.remove(user)
    #     return Response({"detail": "Like removido com sucesso."}, status=status.HTTP_200_OK)
    # elif user in post.likes.all():
    #     post.likes.remove(user)
    # Adiciona o usuário aos likes do post
    post.dislikes.add(user)
    post.save()

    return Response({"detail": "Deslike adicionado com sucesso."}, status=status.HTTP_200_OK)

class UserPostListView(ListCreateAPIView):
    serializer_class = CustomPostSerializer

    def get_queryset(self):
        username = self.kwargs['username']
        user = User.objects.get(username=username)
        return Post.objects.filter(user=user)
    
    def perform_create(self, serializer):
        # Antes de salvar o Post, associe o usuário autenticado ao campo user
        serializer.save(user=self.request.user)

class CommentListCreateView(ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        post_id = self.kwargs['post_id']
        return Comment.objects.filter(post_id=post_id)

    def perform_create(self, serializer):
        post_id = self.kwargs['post_id']
        post = get_object_or_404(Post, post_id=post_id)
        serializer.save(user=self.request.user, post=post)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_comment(request, post_id, comment_id):
    user = request.user

    comment = get_object_or_404(Comment, post_id=post_id, comment_id=comment_id)
    # Verifica se o usuário já curtiu o post
    # if user in comment.likes.all():
    #     comment.likes.remove(user)
    #     return Response({"detail": "Like removido com sucesso."}, status=status.HTTP_200_OK)
    # # Verifica se o usuário já descurtiu o comentário, se sim, remove o deslike
    # elif user in comment.dislikes.all():
    #     comment.dislikes.remove(user)
    # Adiciona o usuário aos likes do post
    comment.likes.add(user)
    comment.save()  

    return Response({"detail": "Comentario curtido com sucesso."}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def dislike_comment(request, post_id, comment_id):
    user = request.user

    comment = get_object_or_404(Comment, post_id=post_id, comment_id=comment_id)
    # Verifica se o usuário já curtiu o post
    # if user in comment.dislikes.all():
    #     comment.dislikes.remove(user)
    #     return Response({"detail": "Dislike removido com sucesso."}, status=status.HTTP_200_OK)
    #  # Verifica se o usuário já curtiu o comentário, se sim, remove o like
    # elif user in comment.likes.all():
    #     comment.likes.remove(user)
    # Adiciona o usuário aos likes do post
    comment.dislikes.add(user)
    comment.save()  

    return Response({"detail": "Deslike adicionado com sucesso."}, status=status.HTTP_200_OK)

class CommentDetailUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated, IsPostOwnerOrReadOnly]

    def get_queryset(self):
        try:
            post_id = self.kwargs['post_id']
            return Comment.objects.filter(post_id=post_id)
        except KeyError:
            # Trate o erro de forma adequada, como retornar um queryset vazio ou levantar uma exceção
            return Comment.objects.none()  # Retorna um queryset vazio
    
