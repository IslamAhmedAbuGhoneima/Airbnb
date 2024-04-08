import json
from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import ConversationMessage, Conversation
from useraccount.models import User


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f"chat_{self.room_name}"

        # join room
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    # leave room
    async def disconnect(self):
        self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Recive message from web socket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        body = text_data_json['body']
        name = text_data_json['name']
        conversation_id = text_data_json['conversation_id']
        sent_to_id = text_data_json['sent_to_id']
        print('text data: ', text_data_json)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat_message",
                "body": body,
                "name": name,
            }
        )

        await self.save_message(conversation_id, body, sent_to_id)
        return await super().receive(text_data)

    async def chat_message(self, event):
        print('Event:', event)
        return await self.send(text_data=json.dumps(event))

    @sync_to_async
    def save_message(self, conversation_id, body, sent_to_id):
        sender = self.scope['user']
        receiver = User.objects.get(id=sent_to_id)
        conversation = Conversation.objects.get(id=conversation_id)
        return ConversationMessage.objects.create(
            conversation=conversation,
            message=body,
            receiver=receiver,
            sender=sender
        )
