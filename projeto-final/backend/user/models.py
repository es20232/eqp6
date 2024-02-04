from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    user_id = models.AutoField(primary_key=True, db_column='user_id')
    email = models.EmailField(
        unique=True,
        blank=True
    )
    profile_image = models.BinaryField(blank=True, null=True, editable = True)

class Post(models.Model):
    post_id = models.AutoField(primary_key=True, db_column='post_id')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post_image = models.BinaryField(editable=True)
    caption = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    likes = models.ManyToManyField(User, related_name='liked_posts', blank=True)
    class Meta: 
        ordering = ('post_id',) 

    def number_of_likes(self):
        return self.likes.count()
    

class Comment(models.Model):
    comment_id = models.AutoField(primary_key=True, db_column='comment_id')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    text = models.TextField()
    # parent_comment = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='replies')
    likes = models.ManyToManyField(User, related_name='liked_comments', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    class Meta: 
        ordering = ('created_at',) 
    def __str__(self): 
        return 'Comment by {} on {}'.format(self.name, self.post) 
    
    def number_of_likes(self):
            return self.likes.count()