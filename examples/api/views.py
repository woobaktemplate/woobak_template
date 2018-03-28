from rest_framework import generics
from rest_framework.filters import SearchFilter, OrderingFilter

from examples.models import Template
from examples.api.serializers import TemplateSerializer

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
