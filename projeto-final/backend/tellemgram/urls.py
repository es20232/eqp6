from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from user import views
from django.urls import path, re_path
from dj_rest_auth.registration.views import RegisterView, VerifyEmailView, ConfirmEmailView
from dj_rest_auth.views import LoginView, LogoutView, PasswordResetView, PasswordResetConfirmView, PasswordChangeView
from user.views import CustomLoginView, CustomRegisterView, CustomUploadViewSet, CustomPasswordChangeView

router = routers.DefaultRouter()
router.register(r'upload', CustomUploadViewSet, basename="upload")

urlpatterns = [
    path("admin/", admin.site.urls),
    # path('api/', include(router.urls))
    path('api/users/', views.UserList.as_view(), name='user-list'),
    path('api/users/<int:pk>/', views.UserDetail.as_view(), name='user-detail'),

    path('password-reset/', PasswordResetView.as_view()),
    path('password-reset-confirm/<str:uidb64>/<str:token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),

    path('password/change/', CustomPasswordChangeView.as_view(), name='password_change'),

    path('account-confirm-email/<str:key>/', ConfirmEmailView.as_view()),
    path('register/', CustomRegisterView.as_view()),
    path('login/', CustomLoginView.as_view()),
    path('logout/', LogoutView.as_view()),
    
    path('upload-image/', include(router.urls), name='upload'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),

    path('verify-email/',
         VerifyEmailView.as_view(), name='rest_verify_email'),
    path('account-confirm-email/',
         VerifyEmailView.as_view(), name='account_email_verification_sent'),
    re_path(r'^account-confirm-email/(?P<key>[-:\w]+)/$',
            VerifyEmailView.as_view(), name='account_confirm_email'),
]


