from django.conf.urls import include, url
from django.contrib import admin

from .views import HomeView, IndexView, AboutView

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', HomeView.as_view(), name='home'),
    url(r'^index/$', IndexView.as_view(), name='index'),
    url(r'^about/$', AboutView.as_view(), name='about'),

    url(r'^api/', include('restapi.urls', namespace='api')),
]
