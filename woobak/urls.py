from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin

from .views import HomeView, IndexView, AboutView, AdminEditView

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^edit/$', AdminEditView.as_view(), name='admin-edit'),
    url(r'^$', HomeView.as_view(), name='home'),
    url(r'^index/$', IndexView.as_view(), name='index'),
    url(r'^about/$', AboutView.as_view(), name='about'),

    url(r'^api/', include('restapi.urls', namespace='api')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
