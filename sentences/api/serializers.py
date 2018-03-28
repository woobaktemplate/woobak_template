from rest_framework import serializers
from sentences.models import Sentence


class SentenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sentence
        fields = ('category',
                  'usage',
                  'topic',
                  'meaning',
                  'sentence',)
