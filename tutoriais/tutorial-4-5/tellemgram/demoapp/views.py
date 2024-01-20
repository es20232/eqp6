from django.shortcuts import render
from formulario.serializers import UserSerializer 
from rest_framework.renderers import JSONRenderer
from rest_framework import viewsets, status  
from rest_framework.response import Response  
from rest_framework.generics import ListCreateAPIView,  RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from .models import User, UploadedFile            
from formulario.serializers import CustomRegisterSerializer
from dj_rest_auth.registration.views import RegisterView
from rest_framework import permissions

# class UserView(viewsets.ModelViewSet): 
#     # renderer_classes = [JSONRenderer] # essa linha
#     permission_classes = [IsAuthenticated]
#     serializer_class = UserSerializer   
#     queryset = User.objects.all() 

#     def list(self, request, *args, **kwargs):
#         # Accessing query parameters from the request
#         name_param = request.query_params.get('username', None)
#         email_param = request.query_params.get('email', None)

#         # Your logic based on the query parameters
#         queryset = User.objects.all()

#         if name_param:
#             queryset = queryset.filter(username__icontains=name_param)

#         if email_param:
#             queryset = queryset.filter(email__icontains=email_param)

#         serializer = self.get_serializer(queryset, many=True)
#         return Response(serializer.data)

class UserList(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

class UserDetail(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

# class UploadViewSet(viewsets.ViewSet):
#     permission_classes = [IsAuthenticated]
#     serializer_class = UploadSerializer
#     MAX_FILE_SIZE_MB = 10  # Specify the maximum file size limit in megabytes

#     def list(self, request):
#         try:
#             # Query all uploaded files
#             uploaded_files = UploadedFile.objects.all()

#             # Serialize the data
#             serializer = UploadSerializer(uploaded_files, many=True)

#             # Return the serialized data as JSON response
#             return Response(serializer.data)
#         except Exception as e:
#             # Handle exceptions appropriately
#             return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#     def create(self, request):
#         try:
#             file_uploaded = request.FILES.get('file_uploaded')
#             content_type = file_uploaded.content_type

#             if not str(content_type).startswith('image'):
#                 raise Exception('O arquivo selecionado não é uma imagem')

#             if file_uploaded.size > self.MAX_FILE_SIZE_MB * 1024 * 1024:
#                 raise Exception('O tamanho máximo do arquivo é de {} MB'.format(self.MAX_FILE_SIZE_MB))

#             # Save the file content using Djongo model
#             uploaded_file = UploadedFile(file_content=file_uploaded.read(), content_type=content_type)
#             uploaded_file.save()

#             response = 'O arquivo foi enviado com sucesso.'

#             return Response(response)
#         except Exception as e:
#             # Handle exceptions appropriately
#             return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CustomRegisterView(RegisterView):
    serializer_class = CustomRegisterSerializer
    permission_classes = [permissions.AllowAny]