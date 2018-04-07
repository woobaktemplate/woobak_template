from rest_framework import generics
from rest_framework.filters import SearchFilter, OrderingFilter

from examples.models import Template, TemplateState
from examples.api.serializers import (
    TemplateSerializer,
    TemplateStateSerializer,
    TemplateAdminSerializer,
)

from utils.paginations import StandardResultPagination, EditingPagination


class TemplateAPIView(generics.ListCreateAPIView):
    queryset = Template.objects.all()
    serializer_class = TemplateSerializer
    pagination_class = EditingPagination
    filter_backends = [SearchFilter, OrderingFilter]

    def get_queryset(self, *args, **kwargs):
        queryset = Template.objects.all().order_by('-id')
        category_of = self.request.GET.get('category')
        saved = self.request.GET.get('saved')
        checked = self.request.GET.get('checked')
        translated = self.request.GET.get('translated')
        if category_of:
            queryset = queryset.filter(category=category_of)
        if saved:
            queryset = queryset.filter(state__saved=1)
        if checked:
            queryset = queryset.filter(state__checked=1)
        if translated:
            queryset = queryset.filter(state__translated=1)
        return queryset


class TemplateDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Template.objects.all()
    serializer_class = TemplateSerializer


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
        if checked:
            queryset = queryset.filter(checked=checked)
        if translated:
            queryset = queryset.filter(translated=translated)
        return queryset


class TemplateAdminAPIView(generics.RetrieveAPIView):
    queryset = TemplateState.objects.all()
    serializer_class = TemplateAdminSerializer
