from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('property.urls')),
    path('user/auth/', include('useraccount.urls')),
    path('chat/', include('chat.urls')),
    path('payment/', include('payment.urls')),
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
