from django.urls import path
from . import views


urlpatterns = [
    path('categories/', views.category_list, name='category_list'),
    path('properties/', views.properties_list, name='property_list'),
    path('properties/create/', views.create_property, name='create_property'),
    path('property/<uuid:pk>/', views.get_property, name='get_property'),
    path('<uuid:pk>/book/', views.book_property, name='book_property'),
    path('<uuid:pk>/reservations/', views.property_reservations,
         name='property_reservations'),
    path('<uuid:pk>/add-to-favorite/',
         views.toggle_favorite, name='toggle_favorite'),
]
