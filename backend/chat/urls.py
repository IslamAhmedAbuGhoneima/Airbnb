from django.urls import path
from . import views

urlpatterns = [
    path('', views.conversation_list, name='conversation_list'),
    path('<uuid:pk>/', views.get_conversation, name='get_conversation'),
    path('<uuid:pk>/conversation-messages/', views.get_conversation_messages,
         name='get_conversation_messages'),
    path('<uuid:user_id>/start-conversation/', views.start_conversation,
         name='start_conversation'),
]
