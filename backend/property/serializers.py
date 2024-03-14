from rest_framework import serializers
from useraccount.models import User
from .models import Property


class LandlordSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
        ]


class PropertySerializer(serializers.ModelSerializer):
    landlord = LandlordSerializer(read_only=True)

    class Meta:
        model = Property
        fields = [
            'uuid', 'landlord', 'title', 'description', 'price_per_night',
            'image_url', 'image', 'bedrooms', 'bathrooms',
            'guests', 'country', 'country_code',
            'category',
        ]
