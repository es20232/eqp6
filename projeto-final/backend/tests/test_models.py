from django.urls import include, path, reverse
from rest_framework.test import APITestCase, URLPatternsTestCase
from rest_framework import status
from rest_framework.reverse import reverse
from user.models import User, Post, Comment

class RegisterTest(APITestCase):
    def test_create_account(self): #OK
        #criar um user no bd
        """
        Ensure we can create a new account object.
        """
        url = reverse('register')
        data = {
            'username': 'toin',
            'email': 'test@example.com',
            'password1': 'testpassword',
            'password2': 'testpassword',
            'first_name': 'John',
            'last_name': 'Doe'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['user']['first_name'], 'John')
        self.assertEqual(response.data['user']['last_name'], 'Doe')

class LoginTests(APITestCase):
    def setUp(self):
        self.user_data = {
            'username': 'toin',
            'email': 'test@example.com',
            'first_name': 'John',
            'last_name': 'Doe',
            'password': 'teste123'
        }
        self.user = User.objects.create_user(**self.user_data)
        # response = self.client.post(url, data, format='json')

    def teste_login_valided(self): #LOGIN VALIDO
        """
        Ensure we can login with custom login view.
        """
        url = reverse('login')
        response = self.client.post(url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
    
    def teste_login_invalided(self):
        pass

# from django.test import TestCase, Client
# #import unittest
# # from django.contrib.auth.models import User
# from user.models import User, Post, Comment
# from django.urls import reverse

# #python3 manage.py test

# class YourTestClass(TestCase): #OK
#     @classmethod
#     def setUpTestData(cls):
#         print("setUpTestData: Run once to set up non-modified data for all class methods.")
#         pass

#     def setUp(self):
#         self.client = Client()

#     def test_cadastro(self):
#         """Teste de cadastro de usuário"""

#         # Teste de cadastro de usuário
#         User.objects.create(username='usuario_teste', first_name='lala', last_name = '123', email='teste@teste.com', password='teste123')

#         # Teste de recuperar usuário cadastrado
#         usuario_cadastrado = User.objects.get(username='usuario_teste')
#         self.assertTrue(usuario_cadastrado)

#     def test_login_valided(self):
#         #login com dados validos
#         register_response = self.client.post('http://localhost:8000/register/', {
#             'username': 'user12',
#             'first_name': 'usuario_teste2',
#             'last_name': 'testeNew',
#             'email': 'teste123@teste.com',
#             'password': 'teste123',
#         }, follow=True)
        
#         self.assertEqual(register_response.status_code, 200, "Deu erro no registro")
        
#         login_response = self.client.post('http://localhost:8000/login/', {
#             'username': 'user12',
#             'password': 'teste123'
#         })

#         print(login_response.content)

#         self.assertEqual(login_response.status_code, 200, "Deu erro no login")
#         # Teste de redirecionamento para a página inicial após o login
