import json
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Property, Category
from .serializers import PropertySerializer, ReservationSerializer, CategorySerializer
# Create your views here.


@api_view(['GET'])
def category_list(request):
    if request.method == "GET":
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def properties_list(request):
    if request.method == "GET":
        properties = Property.objects.all()
        query = request.query_params.get('landlord_id', '')
        if query:
            properties = properties.filter(landlord__id=query)
        serializer = PropertySerializer(properties, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def create_property(request):
    if request.method == 'POST':
        data = request.data
        category = Category.objects.get(uuid=data['category'])
        serializer = PropertySerializer(data=data)
        if serializer.is_valid():
            serializer.save(landlord=request.user, category=category)
            return Response({'success': True}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_property(request, pk):
    if request.method == 'GET':
        property = get_object_or_404(Property, uuid=pk)
        serializer = PropertySerializer(property)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def book_property(request, pk):
    if request.method == 'POST':
        data = request.data
        property = get_object_or_404(Property, uuid=pk)
        serializer = ReservationSerializer(data=data)
        if serializer.is_valid():
            serializer.save(
                created_by=request.user,
                property=property
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def property_reservations(request, pk):
    if request.method == 'GET':
        property = Property.objects.get(uuid=pk)
        reservations = property.reservations.all()
        serializer = ReservationSerializer(reservations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['post'])
def toggle_favorite(request, pk):
    if request.method == 'POST':
        property = Property.objects.get(uuid=pk)
        if request.user in property.favorited.all():
            property.favorited.remove(request.user)
            return Response({"is_favorite": False}, status=status.HTTP_200_OK)
        else:
            property.favorited.add(request.user)
            return Response({"is_favorite": True}, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)
