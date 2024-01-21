from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from dj_rest_auth.registration.views import LoginView, RegisterView, APIView
from rest_framework import permissions, viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from user.models import User, UserImage
from tellemgram.serializers import CustomUserSerializer, UserSerializer, CustomLoginSerializer, CustomRegisterSerializer, CustomUserImage, UserVisibleSerializer
from dj_rest_auth.views import PasswordChangeView
from rest_framework import status

from .permissions import IsSelfOrReadOnly


class UserList(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserVisibleSerializer
    permission_classes = [IsAuthenticated]

class UserDetail(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated, IsSelfOrReadOnly]

class CustomRegisterView(RegisterView):
    serializer_class = CustomRegisterSerializer
    permission_classes = [permissions.AllowAny]

class CustomLoginView(LoginView):
    serializer_class = CustomLoginSerializer
    permission_classes = [permissions.AllowAny]
    
class CustomUploadViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = CustomUserImage
    MAX_FILE_SIZE_MB = 10  # Specify the maximum file size limit in megabytes

    def list(self, request):
        try:
            # Query all uploaded files
            uploaded_files = UserImage.objects.all()

            # Serialize the data
            serializer = CustomUserImage(uploaded_files, many=True)

            # Return the serialized data as JSON response
            return Response(serializer.data)
        except Exception as e:
            # Handle exceptions appropriately
            return Response(str(e))
        
    def create(self, request):
        try:
<<<<<<< Updated upstream
            file_uploaded = request.FILES.get('image')
            content_type = file_uploaded.content_type
=======
            # Retrieve the base64 string from the request data
            base64_string = request.data.get('image', '')
            # user_id = request.data.get('user')
            description = request.data.get('description')
            is_published = request.data.get('is_published')
>>>>>>> Stashed changes

            if not str(content_type).startswith('image'):
                raise Exception('O arquivo selecionado não é uma imagem')

<<<<<<< Updated upstream
            if file_uploaded.size > self.MAX_FILE_SIZE_MB * 1024 * 1024:
                raise Exception('O tamanho máximo do arquivo é de {} MB'.format(self.MAX_FILE_SIZE_MB))

            # Save the file content using Djongo model
            uploaded_file = UserImage(file_content=file_uploaded.read(), content_type=content_type)
=======
            current_user = request.user
            print(current_user)
            uploaded_file = UserImage(user=current_user, image=binary_data, description=description, is_published=is_published)
>>>>>>> Stashed changes
            uploaded_file.save()

            response = 'O arquivo foi enviado com sucesso.'

            return Response(response)
        except Exception as e:
            # Handle exceptions appropriately
            return Response(str(e))
        
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