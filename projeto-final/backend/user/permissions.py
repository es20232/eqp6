from rest_framework.permissions import BasePermission

class IsSelfOrReadOnly(BasePermission):
    """
    Custom permission to only allow users to retrieve, update, or delete their own details.
    """

    def has_object_permission(self, request, view, obj):
        # Check if the request method is safe (GET, HEAD, OPTIONS)
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True

        # Check if the user making the request is the same as the user in the object
        elif obj == request.user:
            # If it's a PUT request, check for the presence of the 'password' field in the request data
            if request.method == 'PUT' and 'password' in request.data:
                # You can add more sophisticated logic here to validate the password
                # For simplicity, we're assuming a direct comparison here. In a real-world scenario, you should hash and compare passwords securely.
                return obj.check_password(request.data['password'])
            return True

        return False
