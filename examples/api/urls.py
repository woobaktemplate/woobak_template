from django.conf.urls import url
from examples.api.views import TemplateAPIView

examples_urlpatterns = [
    url(r'^template/$', TemplateAPIView.as_view(), name='template'),
]
