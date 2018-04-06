from django.conf.urls import url
from examples.api.views import (
    TemplateAPIView,
    TemplateStateAPIView,
    TemplateAdminAPIView,
)

examples_urlpatterns = [
    url(r'^template/$', TemplateAPIView.as_view(), name='template'),
    url(r'^template-state/$', TemplateStateAPIView.as_view(), name='template-state'),
    url(r'^template-admin/(?P<pk>\d+)/$', TemplateAdminAPIView.as_view(), name='template-admin'),
]
