import os


from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator

from django.core.asgi import get_asgi_application


from chat import routing
from chat.token_auth import TokenAuthMiddleware

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

django_asgi_application = get_asgi_application()


application = ProtocolTypeRouter(
    {
        'http': django_asgi_application,
        'websocket': TokenAuthMiddleware(
            URLRouter(
                routing.websocket_urlpatterns
            )
        )
    }
)
