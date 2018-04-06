from rest_framework import serializers

from examples.models import Template, TemplateState


class TemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Template
        fields = ('template_type',
                  'category',
                  'topic',
                  'title',
                  'template',
                  'translation',
                  'done',)


class TemplateStateSerializer(serializers.ModelSerializer):
    topic = serializers.SerializerMethodField()

    class Meta:
        model = TemplateState
        fields = ('topic',
                  'source',
                  'saved',
                  'checked',
                  'translated',)

    def get_topic(self, obj):
        return obj.template
