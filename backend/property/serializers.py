from rest_framework import serializers
from useraccount.serializers import LandlordSerializer
from .models import Property, Reservation, Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [
            'uuid',
            'title',
            'icon',
            'icon_url'
        ]

class PropertySerializer(serializers.ModelSerializer):
    landlord = LandlordSerializer(read_only=True)

    class Meta:
        model = Property
        fields = [
            'uuid', 'landlord', 'title', 'description', 'price_per_night',
            'image_url', 'image', 'bedrooms', 'bathrooms',
            'guests', 'country', 'country_code',
            'category', 'reservations', 'favorited',
        ]
        read_only_fields = ['favorited']


class ReservationSerializer(serializers.ModelSerializer):
    created_by = serializers.StringRelatedField()
    property = PropertySerializer(read_only=True)

    class Meta:
        model = Reservation
        fields = '__all__'
