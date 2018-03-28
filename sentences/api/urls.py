from django.conf.urls import url
from sentences.api.views import SentenceAPIView

sentences_urlpatterns = [
    url(r'^sentence/$', SentenceAPIView.as_view(), name='sentence'),
]
