from django.contrib import admin
from .models import Conversation, ConversationMessage
# Register your models here.


@admin.register(Conversation)
class ConversationAdmin(admin.ModelAdmin):
    list_display = ['created_at', 'modified_at']
    search_fields = ['created_at']
    list_filter = ['created_at', 'modified_at']


@admin.register(ConversationMessage)
class ConversationMessageAdmin(admin.ModelAdmin):
    list_display = ['sender', 'receiver', 'created_at']
    search_fields = ['sender', 'receiver', 'created_at']
    list_filter = ['sender', 'receiver', 'created_at']
