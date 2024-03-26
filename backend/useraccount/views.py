from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from property.serializers import ReservationSerializer
from .serializers import UserSerializer
from .models import User
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


@api_view(['GET'])
def user_reservations(request):
    if request.method == 'GET':
        reservations = request.user.reservations.all()
        serializer = ReservationSerializer(reservations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)
