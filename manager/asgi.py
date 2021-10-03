"""
ASGI config for manager project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/asgi/
"""

import os
from django.conf.urls import url

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'manager.settings')

from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.core.asgi import get_asgi_application
import chatroom.routing
from django.conf import settings



application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            chatroom.routing.websocket_urlpatterns
        )
    )
})
