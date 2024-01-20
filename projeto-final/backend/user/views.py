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
import base64, io

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

            # Return the serialized data as a JSON response
            return Response(serializer.data)
        except Exception as e:
            # Handle exceptions appropriately
            return Response(str(e))

    def create(self, request):
        try:
            # Retrieve the base64 string from the request data
            base64_string = request.data.get('image', '')
            user_id = request.data.get('user')

            # Convert base64 string to binary data
            binary_data = base64.b64decode(base64_string)

            current_user = request.user
            uploaded_file = UserImage(user=current_user, image=binary_data)
            uploaded_file.save()

            response = 'O arquivo foi enviado com sucesso.'

            return Response(response, status=status.HTTP_201_CREATED)
        except Exception as e:
            # Handle exceptions appropriately
            print(e)
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
        
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