import stripe
import json
from decimal import Decimal
from django.shortcuts import get_object_or_404, redirect
# from django.urls import reverse
from rest_framework.decorators import api_view, APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from property.models import Reservation
from django.http import HttpResponseRedirect
# Create your views here.


# create the Stripe instance
stripe.api_key = settings.STRIPE_SECRET_KEY
stripe.api_version = settings.STRIPE_API_VERSION


@api_view(['POST'])
def payment_process(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        reservation = get_object_or_404(Reservation, id=data['id'])
        success_url = f'http://localhost:3000/payment/completed'
        cancel_url = f'http://localhost:3000/payment/canceled'
        # Stripe checkout session data
        session_data = {
            'mode': 'payment',
            'client_reference_id': reservation.id,
            'success_url': success_url,
            'cancel_url': cancel_url,
            'line_items': [
                {
                    'price_data': {
                        'unit_amount': int(reservation.price * Decimal('100')),
                        'currency': 'usd',
                        'product_data': {
                            'name': reservation.property.title,
                            'images': [reservation.property.image_url()],
                        },
                    },
                    'quantity': 1,
                }
            ]
        }
        session = stripe.checkout.Session.create(**session_data)
        return Response({'url': session.url}, status=status.HTTP_200_OK)
