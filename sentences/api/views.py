from rest_framework import generics
from rest_framework.filters import SearchFilter, OrderingFilter

from sentences.models import Sentence
from sentences.api.serializers import SentenceSerializer

from utils.paginations import StandardResultPagination


class SentenceAPIView(generics.ListCreateAPIView):
    queryset = Sentence.objects.all()
    serializer_class = SentenceSerializer
    pagination_class = StandardResultPagination
    filter_backends = [SearchFilter, OrderingFilter]

    def get_queryset(self, *args, **kwargs):
        queryset = Sentence.objects.all().order_by('id')
        category_of = self.request.GET.get('category')
        usage_of = self.request.GET.get('usage')
        topic_of = self.request.GET.get('topic')
        if category_of:
            queryset = queryset.filter(category=category_of)
        if usage_of:
            queryset = queryset.filter(usage=usage_of)
        if topic_of:
            queryset = queryset.filter(topic=topic_of)
        return queryset
