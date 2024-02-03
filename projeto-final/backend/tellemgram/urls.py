from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from user import views
from django.urls import path, re_path
from dj_rest_auth.registration.views import RegisterView, VerifyEmailView, ConfirmEmailView
from dj_rest_auth.views import LoginView, LogoutView, PasswordResetView, PasswordResetConfirmView, PasswordChangeView
from user.views import ( 
    CustomLoginView, CustomRegisterView, CustomPasswordChangeView, 
    CustomPasswordResetView, PostListView, PostDetailView, UserPostListView,
    PostLikeCreateView, PostCreateView
    )

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="Tellemgram API",
      default_version='v1',
      description="API description",
      terms_of_service="https://www.yourapp.com/terms/",
      contact=openapi.Contact(email="ellemalmeidaamorim@ufpi.edu.br"),
      license=openapi.License(name="Your License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

router = routers.DefaultRouter()
# router.register(r'users', UserRetrieveUpdateDestroyView, basename='user')
# router.register(r'upload', CustomUploadViewSet, basename="upload")
# router.register(r'posts', PostDetailView, basename="posts")

urlpatterns = [
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
     
    path("admin/", admin.site.urls),
    # path('api/', include(router.urls))
    path('users/', views.UserListView.as_view(), name='user-list'),
    path('users/<int:pk>/', views.UserDetailIDView.as_view(), name='user-detail'),
    path('users/<str:username>/', views.UserDetailView.as_view(), name='user-detail'),

    path('posts/', PostListView.as_view(), name='post-list'),
    path('posts/create/', PostCreateView.as_view(), name='post-list'),
    path('posts/<int:pk>/', PostDetailView.as_view(), name='post-detail'),
    path('posts/<str:username>/', UserPostListView.as_view(), name='user-post-list'),
    path('post-like/', PostLikeCreateView.as_view(), name='post-like-create'),

    path('password-reset/', CustomPasswordResetView.as_view()),
    path('password-reset-confirm/<str:uidb64>/<str:token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    # path('upload-image/', include(router.urls), name='upload'),

    path('password/change/', CustomPasswordChangeView.as_view(), name='password_change'),

    path('account-confirm-email/<str:key>/', ConfirmEmailView.as_view()),
    path('register/', CustomRegisterView.as_view()),
    path('login/', CustomLoginView.as_view()),
    path('logout/', LogoutView.as_view()),
    
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),

    path('verify-email/',
         VerifyEmailView.as_view(), name='rest_verify_email'),
    path('account-confirm-email/',
         VerifyEmailView.as_view(), name='account_email_verification_sent'),
    re_path(r'^account-confirm-email/(?P<key>[-:\w]+)/$',
            VerifyEmailView.as_view(), name='account_confirm_email'),
]


