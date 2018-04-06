from rest_framework import generics
from rest_framework.filters import SearchFilter, OrderingFilter

from examples.models import Template, TemplateState
from examples.api.serializers import (
    TemplateSerializer,
    TemplateStateSerializer,
    TemplateAdminSerializer,
)

from utils.paginations import StandardResultPagination


class TemplateAPIView(generics.ListCreateAPIView):
    queryset = Template.objects.all()
    serializer_class = TemplateSerializer
    pagination_class = StandardResultPagination
    filter_backends = [SearchFilter, OrderingFilter]

    def get_queryset(self, *args, **kwargs):
        queryset = Template.objects.all().order_by('id')
        category_of = self.request.GET.get('category')
        if category_of:
            queryset = queryset.filter(category=category_of)
        return queryset


class TemplateStateAPIView(generics.ListCreateAPIView):
    queryset = TemplateState.objects.all()
    serializer_class = TemplateStateSerializer
    pagination_class = StandardResultPagination
    filter_backends = [SearchFilter, OrderingFilter]

    def get_queryset(self, *args, **kwargs):
        queryset = TemplateState.objects.all().order_by('id')
        saved = self.request.GET.get('saved')
        checked = self.request.GET.get('checked')
        translated = self.request.GET.get('translated')
        if saved:
            queryset = queryset.filter(saved=saved)
        elif checked:
            queryset = queryset.filter(checked=checked)
        elif translated:
            queryset = queryset.filter(translated=translated)
        return queryset


class TemplateAdminAPIView(generics.RetrieveAPIView):
    queryset = TemplateState.objects.all()
    serializer_class = TemplateAdminSerializer
