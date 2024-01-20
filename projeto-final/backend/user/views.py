from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from dj_rest_auth.registration.views import LoginView, RegisterView, APIView
from rest_framework import permissions, viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from user.models import User, UserImage
from tellemgram.serializers import CustomUserSerializer, UserSerializer, CustomLoginSerializer, CustomRegisterSerializer, CustomUserImage, UserVisibleSerializer

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
            file_uploaded = request.FILES.get('image')
            content_type = file_uploaded.content_type

            if not str(content_type).startswith('image'):
                raise Exception('O arquivo selecionado não é uma imagem')

            if file_uploaded.size > self.MAX_FILE_SIZE_MB * 1024 * 1024:
                raise Exception('O tamanho máximo do arquivo é de {} MB'.format(self.MAX_FILE_SIZE_MB))

            # Save the file content using Djongo model
            uploaded_file = UserImage(file_content=file_uploaded.read(), content_type=content_type)
            uploaded_file.save()

            response = 'O arquivo foi enviado com sucesso.'

            return Response(response)
        except Exception as e:
            # Handle exceptions appropriately
            return Response(str(e))
