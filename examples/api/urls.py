from django.conf.urls import url
from examples.api.views import (
    TemplateAPIView,
    TemplateDetailAPIView,
    TemplateStateAPIView,
    TemplateStateDetailAPIView,
    TemplateAdminAPIView,
    TemplateTypeAPIView,
)

examples_urlpatterns = [
    url(r'^template/$', TemplateAPIView.as_view(), name='template'),
    url(r'^template/(?P<pk>\d+)/$', TemplateDetailAPIView.as_view(), name='template-detail'),
    url(r'^template-state/$', TemplateStateAPIView.as_view(), name='template-state'),
    url(r'^template-state/(?P<pk>\d+)/$', TemplateStateDetailAPIView.as_view(), name='template-state-detail'),
    url(r'^template-admin/(?P<pk>\d+)/$', TemplateAdminAPIView.as_view(), name='template-admin'),
    url(r'^template-type/(?P<pk>\d+)/$', TemplateTypeAPIView.as_view(), name='template-type'),
]
