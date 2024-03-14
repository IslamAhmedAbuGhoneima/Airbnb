from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Property
from .serializers import PropertySerializer

# Create your views here.


@api_view(['GET'])
def properties_list(request):
    if request.method == "GET":
        properties = Property.objects.all()
        serializer = PropertySerializer(properties, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_property(request):
    if request.method == 'POST':
        data = request.data
        serializer = PropertySerializer(data=data)
        if serializer.is_valid():
            serializer.save(landlord=request.user)
            return Response({'success': True}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_property(request, uuid):
    if request.method == 'GET':
        property = get_object_or_404(Property, uuid=uuid)
        serializer = PropertySerializer(property)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_404_NOT_FOUND)
