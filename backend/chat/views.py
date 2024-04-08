from django.shortcuts import redirect
from django.db.models import Q
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Conversation, ConversationMessage
from .serializers import ConversationSerializer, ConversationMessageSerializer
from useraccount.models import User
# Create your views here.


@api_view(['GET'])
def conversation_list(request):
    if request.method == 'GET':
        conversations = request.user.conversations.all()
        serializer = ConversationSerializer(conversations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_conversation(request, pk):
    if request.method == 'GET':
        conversation = request.user.conversations.get(id=pk)
        serializer = ConversationSerializer(conversation)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_conversation_messages(request, pk):
    if request.method == 'GET':
        conversation = Conversation.objects.get(id=pk)
        conversation_messages = conversation.messages.all()
        serializer = ConversationMessageSerializer(
            conversation_messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def start_conversation(request, user_id):
    if request.method == 'GET':
        user = User.objects.get(id=user_id)
        conversation = Conversation.objects.filter(users__in=[user]) \
            .filter(users__in=[request.user])

        if conversation:
            serializer = ConversationSerializer(conversation, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            conversation = Conversation.objects.create()
            conversation.users.add(request.user)
            conversation.users.add(user)
            serializer = ConversationSerializer(conversation)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)
