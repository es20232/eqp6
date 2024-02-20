from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from user.models import User, Post, Comment
from tellemgram.serializers import PostSerializer, CommentSerializer

class IntegrationTest(TestCase):
    def setUp(self):
        # Create test users
        self.user1 = User.objects.create_user(username='user1', email='user1@example.com', password='password1')
        self.user2 = User.objects.create_user(username='user2', email='user2@example.com', password='password2')

        # Create some test posts
        self.post1 = Post.objects.create(user=self.user1, caption='Content 1')
        self.post2 = Post.objects.create(user=self.user2, caption='Content 2')

        # Create some test comments
        self.comment1 = Comment.objects.create(user=self.user1, post=self.post1, text='Comment 1')
        self.comment2 = Comment.objects.create(user=self.user2, post=self.post2, text='Comment 2')

    def test_post_comment_integration_authenticated(self):
        """
        Test the interaction between the list view of posts and the list view of comments
        when the user is authenticated.
        """
        # Log in as a user
        login_url = reverse('login')
        client = APIClient()
        login_data = {'username': 'user1', 'password': 'password1'}
        response_login = client.post(login_url, login_data, format='json')
        self.assertEqual(response_login.status_code, status.HTTP_200_OK)

        # Get the authentication token
        token = response_login.data['access']

        # Create an authorization header with the token
        client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)

        # Get the authenticated list of posts
        url_posts = reverse('post-list')
        response_posts = client.get(url_posts)
        self.assertEqual(response_posts.status_code, status.HTTP_200_OK)

        # Verify if the response data matches the serialized data
        serializer_posts = PostSerializer(instance=[self.post1, self.post2], many=True)
        sorted_serializer_posts_data = sorted(serializer_posts.data, key=lambda x: x['created_at'], reverse=True)
        self.assertEqual(response_posts.data, sorted_serializer_posts_data)

        # Get the authenticated list of comments for the first post
        url_comments = reverse('comment-list', kwargs={'post_id': self.post1.post_id})
        response_comments = client.get(url_comments)
        self.assertEqual(response_comments.status_code, status.HTTP_200_OK)

        # Verify if the response data matches the serialized data
        serializer_comments = CommentSerializer(instance=[self.comment1], many=True)
        self.assertEqual(response_comments.data, serializer_comments.data)
