from django.urls import path
from . import views

urlpatterns = [
    path('properties/', views.properties_list, name='property_list'),
]
