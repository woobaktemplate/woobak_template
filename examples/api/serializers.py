from rest_framework import serializers
from examples.models import Template


class TemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Template
        fields = ('category',
                  'topic',
                  'template',
                  'translation',)
