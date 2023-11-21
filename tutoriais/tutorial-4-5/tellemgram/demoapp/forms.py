# # forms.py
# from django import forms
# from .models import User

# class MyModelForm(forms.ModelForm):
#     class Meta:
#         model = User
#         fields = ['field1', 'field2']  # Adicione outros campos conforme necessário
from django import forms
from .models import User
from .models import Image

class SeuModeloForm(forms.ModelForm):
    class Meta:
        model = User
        fields = '__all__'

# class ImageUploadForm(forms.ModelForm):
#     class Meta:
#         model = Image
#         fields = ['title', 'image']