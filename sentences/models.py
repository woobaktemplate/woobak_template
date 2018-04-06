from django.db import models


class Sentence(models.Model):
    category = models.CharField(max_length=50,
                                blank=True,
                                null=True)
    usage = models.CharField(max_length=50,
                             blank=True,
                             null=True)
    topic = models.CharField(max_length=50,
                             blank=True,
                             null=True)
    meaning = models.TextField(blank=True, null=True)
    sentence = models.TextField(blank=True, null=True)

    def __str__(self):
        return '{} {} {}'.format(self.category, self.usage, self.topic)


class TemplateSentence(models.Model):
    category = models.CharField(max_length=50,
                                blank=True,
                                null=True)
    usage = models.CharField(max_length=50,
                             blank=True,
                             null=True)
    topic = models.CharField(max_length=50,
                             blank=True,
                             null=True)
    meaning = models.TextField(blank=True, null=True)
    sentence = models.TextField(blank=True, null=True)

    def __str__(self):
        return '{} {} {}'.format(self.category, self.usage, self.topic)
