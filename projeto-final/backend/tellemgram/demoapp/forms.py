# # forms.py
# from django import forms
# from .models import User

from django import forms
from .models import User

class SeuModeloForm(forms.ModelForm):
    class Meta:
        model = User
        fields = '__all__'

# class ImageUploadForm(forms.ModelForm):
#     class Meta:
#         model = Image
#         fields = ['title', 'image']