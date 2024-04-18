from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404
from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from property.serializers import ReservationSerializer
from .serializers import UserSerializer
from .models import User

# google authentication
from dj_rest_auth.registration.views import SocialAccount, SocialLoginView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
# Create your views here.


@api_view(['GET'])
def get_user(request, pk):
    if request.method == 'GET':
        try:
            user = get_object_or_404(User, id=pk)
            serializer = UserSerializer(user)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def update_user(request):
    if request.method == 'PUT':
        user = request.user
        print("*"*50)
        print(user)
        print("*"*50)
        data = request.data
        serializer = UserSerializer(instance=user, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'user updated successfully'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def user_reservations(request):
    if request.method == 'GET':
        reservations = request.user.reservations.all()
        serializer = ReservationSerializer(reservations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)


def email_confirm_redirect(request, key):
    return HttpResponseRedirect(
        f"{settings.EMAIL_CONFIRM_REDIRECT_BASE_URL}{key}/"
    )


def password_reset_confirm_redirect(request, uidb64, token):
    return HttpResponseRedirect(
        f"{settings.PASSWORD_RESET_CONFIRM_REDIRECT_BASE_URL}{uidb64}/{token}/"
    )


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = "http://localhost:3000/"
    client_class = OAuth2Client
