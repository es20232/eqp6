from django.contrib import admin

from user.models import User, Post, Comment

admin.site.register(User)
admin.site.register(Post)
admin.site.register(Comment)