from rest_framework import serializers
from .models import Conversation, ConversationMessage
from useraccount.serializers import UserSerializer


class ConversationSerializer(serializers.ModelSerializer):
    users = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Conversation
        fields = ['id', 'users', 'created_at', 'modified_at']


class ConversationMessageSerializer(serializers.ModelSerializer):
    sender = serializers.StringRelatedField()
    receiver = serializers.StringRelatedField()

    class Meta:
        model = ConversationMessage
        fields = ['id', 'sender', 'receiver', 'message', 'created_at']
