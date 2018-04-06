from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from sentences.models import TemplateSentence


class Template(models.Model):
    template_type = models.CharField(max_length=30,
                                     blank=True,
                                     null=True) # email, presentation
    category = models.CharField(max_length=50,
                                blank=True,
                                null=True)
    topic = models.CharField(max_length=200,
                             blank=True,
                             null=True)
    title = models.CharField(max_length=100,
                             blank=True,
                             null=True)
    template = models.TextField(blank=True, null=True)
    translation = models.TextField(blank=True, null=True)
    done = models.BooleanField(default=0)

    def __str__(self):
        if self.done == 0:
            status = 'Not Done'
        elif self.done == 1:
            status = 'Done'
        return '{} - {}'.format(self.category, status)


class TemplateState(models.Model):
    template = models.OneToOneField(Template,
                                    on_delete=models.CASCADE,
                                    related_name='state')
    source = models.CharField(max_length=100,
                              blank=True,
                              null=True)
    saved = models.BooleanField(default=0)
    checked = models.BooleanField(default=0)
    translated = models.BooleanField(default=0)

    def __str__(self):
        return '{} - {}'.format(self.template.category, self.template.status)


# right before Template save
@receiver(post_save, sender=Template)
def create_template_state(sender, instance, created, **kwargs):
    if created:
        TemplateState.objects.create(template=instance)

@receiver(post_save, sender=Template)
def save_template_state(sender, instance, **kwargs):
    instance.profile.save()
