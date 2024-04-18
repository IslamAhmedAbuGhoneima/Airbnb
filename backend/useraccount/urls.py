from allauth.socialaccount.views import signup
from django.urls import path
from dj_rest_auth.jwt_auth import get_refresh_view
from dj_rest_auth.views import (
    LoginView,
    PasswordChangeView,
    PasswordResetView,
    PasswordResetConfirmView,

    LogoutView
)
from dj_rest_auth.registration.views import (
    RegisterView,
    ResendEmailVerificationView,
    VerifyEmailView
)
from rest_framework_simplejwt.views import TokenVerifyView
from . import views

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('user-detail/<uuid:pk>/', views.get_user, name='get_user'),
    path('user-update/', views.update_user, name='update_user'),
    path('user-reservations/', views.user_reservations, name='user_reservations'),
    #
    path(
        "register/verify-email/",
        VerifyEmailView.as_view(),
        name="rest_verify_email"
    ),
    path(
        "register/resend-email/",
        ResendEmailVerificationView.as_view(),
        name="rest_resend_email"
    ),
    path(
        "account-confirm-email/<str:key>/",
        views.email_confirm_redirect,
        name="account_confirm_email"
    ),
    path(
        "account-confirm-email/",
        VerifyEmailView.as_view(),
        name="account_email_verification_sent"
    ),
    path(
        "password/change/",
        PasswordChangeView.as_view(),
        name="password_change"
    ),
    path(
        "password/reset/",
        PasswordResetView.as_view(),
        name="rest_password_reset"
    ),
    path(
        "password/reset/confirm/<str:uidb64>/<str:token>/",
        views.password_reset_confirm_redirect,
        name="password_reset_confirm",
    ),
    path(
        "password/reset/confirm/",
        PasswordResetConfirmView.as_view(),
        name="password_reset_confirm"
    ),


    path("signup/", signup, name="socialaccount_signup"),
    path("google/", views.GoogleLogin.as_view(), name="google_login"),

]

