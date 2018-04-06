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
                  'created',
                  'updated',
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
        return obj.template.topic


class TemplateAdminSerializer(serializers.ModelSerializer):
    total_number = serializers.SerializerMethodField()
    done_number = serializers.SerializerMethodField()
    in_progress_number = serializers.SerializerMethodField()
    template_saved = serializers.SerializerMethodField()
    template_checked = serializers.SerializerMethodField()
    template_translated = serializers.SerializerMethodField()

    class Meta:
        model = TemplateState
        fields = ('total_number',
                  'done_number',
                  'in_progress_number',
                  'template_saved',
                  'template_checked',
                  'template_translated',)

    def get_total_number(self, obj):
        return Template.objects.all().count()

    def get_done_number(self, obj):
        return Template.objects.filter(done=True).count()

    def get_in_progress_number(self, obj):
        return Template.objects.filter(done=False).count()

    def get_template_saved(self, obj):
        return TemplateState.objects.filter(saved=True).count()

    def get_template_checked(self, obj):
        return TemplateState.objects.filter(checked=True).count()

    def get_template_translated(self, obj):
        return TemplateState.objects.filter(checked=True).count()
