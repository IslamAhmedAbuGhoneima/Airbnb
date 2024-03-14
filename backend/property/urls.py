from django.urls import path
from . import views


urlpatterns = [
    path('properties/', views.properties_list, name='property_list'),
    path('properties/create/', views.create_property, name='create_property'),
    path('properties/<uuid:uuid>/', views.get_property, name='get_property'),
]
