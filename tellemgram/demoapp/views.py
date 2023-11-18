from django.shortcuts import render
from formulario.serializers import UserSerializer, UploadSerializer 
from rest_framework.renderers import JSONRenderer
from rest_framework import viewsets, status  
from rest_framework.response import Response  
from .models import User, UploadedFile            

class UserView(viewsets.ModelViewSet): 
    # renderer_classes = [JSONRenderer] # essa linha
    serializer_class = UserSerializer   
    queryset = User.objects.all() 

    def list(self, request, *args, **kwargs):
        # Accessing query parameters from the request
        name_param = request.query_params.get('username', None)
        email_param = request.query_params.get('email', None)

        # Your logic based on the query parameters
        queryset = User.objects.all()

        if name_param:
            queryset = queryset.filter(username__icontains=name_param)

        if email_param:
            queryset = queryset.filter(email__icontains=email_param)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class UploadViewSet(viewsets.ViewSet):
    serializer_class = UploadSerializer
    MAX_FILE_SIZE_MB = 10  # Specify the maximum file size limit in megabytes

    def list(self, request):
        try:
            # Query all uploaded files
            uploaded_files = UploadedFile.objects.all()

            # Serialize the data
            serializer = UploadSerializer(uploaded_files, many=True)

            # Return the serialized data as JSON response
            return Response(serializer.data)
        except Exception as e:
            # Handle exceptions appropriately
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def create(self, request):
        try:
            file_uploaded = request.FILES.get('file_uploaded')
            content_type = file_uploaded.content_type

            if file_uploaded.size > self.MAX_FILE_SIZE_MB * 1024 * 1024:
                raise Exception("File size exceeds the maximum limit of {} MB".format(self.MAX_FILE_SIZE_MB))

            # Save the file content using Djongo model
            uploaded_file = UploadedFile(file_content=file_uploaded.read(), content_type=content_type)
            uploaded_file.save()

            response = "POST API and you have uploaded a {} file. File saved with id: {}".format(content_type, uploaded_file.id)

            return Response(response)
        except Exception as e:
            # Handle exceptions appropriately
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)