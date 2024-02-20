from django.urls import include, path, reverse
from rest_framework.test import APITestCase, URLPatternsTestCase
from rest_framework import status
from rest_framework.reverse import reverse
from user.models import User, Post, Comment
from datetime import datetime, timedelta

class RegisterTest(APITestCase):
    def test_create_account(self): #TESTAR CADASTRAR USUARIO - OK
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

    def teste_login_valided(self): #LOGIN VALIDO - OK
        """
        Ensure we can login with custom login view.
        """
        url = reverse('login')
        response = self.client.post(url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
    
    def teste_login_invalided(self): #LOGIN INVALIDO - OK
        """
        Ensure we can't login with custom login view.
        """
        url = reverse('login')
        self.user_data['password'] = 'senha'
        response = self.client.post(url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertNotIn('access', response.data)
        self.assertNotIn('refresh', response.data)

class UserListViewTest(APITestCase): #TESTE DE LISTAR DE USUARIOS
    def setUp(self):
        # Crie alguns usuários para testar
        self.user1 = User.objects.create_user(username='pedro', email='pedro@example.com', password='12345678')
        self.user2 = User.objects.create_user(username='maria', email='maria@example.com', password='12345678')

    def test_user_list_view(self):
        """
        Verifique se a visualização da lista de usuários está acessível apenas para usuários autenticados.
        """
        # Tente acessar a lista de usuários sem autenticação
        url = reverse('user-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # Autentique-se como um usuário
        self.client.login(username='pedro', password='12345678')

        # Tente acessar a lista de usuários autenticado
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Verifique se os usuários esperados estão presentes na resposta
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]['username'], 'pedro')
        self.assertEqual(response.data[1]['username'], 'maria')

class CustomPasswordChangeViewTest(APITestCase): #TESTES UNITARIOS: ALTERAÇÃO DE SENHA
    def setUp(self):
        # Criar um usuário de teste
        self.user = User.objects.create_user(username='test_user', email='test@example.com', password='old_password')

    def test_password_change_success(self):  # TESTE DE ALTERAÇÃO DE SENHA COM SUCESSO - OK
        """
        Verifique se a senha é alterada com sucesso quando fornecidas as informações corretas.
        """
        url = reverse('password_change')
        self.client.login(username='test_user', password='old_password')

        data = {
            'old_password': 'old_password',
            'new_password1': 'new_password',
            'new_password2': 'new_password',
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Verificar se a senha foi alterada
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password('new_password'))

    def test_password_change_invalid_old_password(self): #ALTERAÇÃO DE SENHA INVALIDA: SENHA ANTIGA ERRADA - OK
        """
        Verifique se uma mensagem de erro é retornada quando a senha antiga é incorreta.
        """
        url = reverse('password_change')
        self.client.login(username='test_user', password='old_password')

        data = {
            'old_password': 'wrong_old_password',
            'new_password1': 'new_password',
            'new_password2': 'new_password',
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('Senha antiga incorreta.', response.data['detail'])

    def test_password_change_missing_old_password(self): #ALTERAÇÃO DE SENHA INVALIDA: SENHA ANTIGA NAO FORNECIDA - OK
        """
        Verifique se uma mensagem de erro é retornada quando a senha antiga não é fornecida.
        """
        url = reverse('password_change')
        self.client.login(username='test_user', password='old_password')

        data = {
            'new_password1': 'new_password',
            'new_password2': 'new_password',
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('A senha antiga não foi fornecida.', response.data['detail'])

class PostListViewTest(APITestCase): #TESTES DE POSTS
    def setUp(self):
        # Criar alguns usuários de teste
        self.user1 = User.objects.create_user(username='user1', email='user1@example.com', password='password1')
        self.user2 = User.objects.create_user(username='user2', email='user2@example.com', password='password2')

        # Criar alguns posts de teste
        self.post1 = Post.objects.create(user=self.user1, caption='Content 1')
        self.post2 = Post.objects.create(user=self.user2, caption='Content 2')
        self.post3 = Post.objects.create(user=self.user1, caption='Content 3')

        # Definir timestamps para os posts
        curr = datetime.now()
        self.post1.created_at = curr - timedelta(days=3)
        self.post1.save()
        self.post2.created_at = curr - timedelta(days=2)
        self.post2.save()
        self.post3.created_at = curr - timedelta(days=1)
        self.post3.save()

    def test_list_posts(self): #VERIFICAR SE OS POSTS ESTAO LISTADOS CORRETAMENTE - OK
        """
        Verifique se os posts são listados corretamente.
        """
        url = reverse('post-list')
        self.client.force_authenticate(user=self.user1)

        # Teste para todos os posts
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)

        # Teste para filtragem de número de posts
        response = self.client.get(url + '?n=2')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

        # Teste para ordenação por data de criação
        self.assertEqual(response.data[0]['caption'], 'Content 3')
        self.assertEqual(response.data[1]['caption'], 'Content 2')
    
    def test_create_post_empty_caption(self):#POSTAGEM INVALIDA: DESCRICAO NAO FORNECIDA - OK
        """
        Verifique se uma tentativa de fazer um post com descricao vazia resulta em um erro.
        """
        url = reverse('post-list')
        self.client.force_authenticate(user=self.user1)

        data = {'caption': ''}
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

class CommentModelTest(APITestCase): # TESTES DE COMENTARIOS E DE LIKES NO COMENTARIO
    @classmethod
    def setUpTestData(cls): #TESTE DE PUBLICACAO DE COMENTARIO - OK
        # Criar um usuário de teste
        cls.user = User.objects.create_user(username='test_user', email='test@example.com', password='password')

        # Criar um post de teste
        cls.post = Post.objects.create(user=cls.user, caption='Test content')

        # Criar alguns comentários de teste
        cls.comment1 = Comment.objects.create(user=cls.user, post=cls.post, text='Comment 1')
        cls.comment2 = Comment.objects.create(user=cls.user, post=cls.post, text='Comment 2')
        cls.comment3 = Comment.objects.create(user=cls.user, post=cls.post, text='Comment 3')

        # Adicionar likes aos comentários
        cls.comment1.likes.add(cls.user)
    

    def test_number_of_likes(self): #
        """
        Testa se o método number_of_likes retorna o número correto de likes em um comentário.
        """
        # Verifique se o comentário 1 tem 1 like
        self.assertEqual(self.comment1.number_of_likes(), 1)

        # Verifique se os comentários 2 e 3 não têm likes
        self.assertEqual(self.comment2.number_of_likes(), 0)
        self.assertEqual(self.comment3.number_of_likes(), 0)

