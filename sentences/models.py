from django.db import models


class Sentence(models.Model):
    category = models.CharField(max_length=50)
    usage = models.CharField(max_length=50)
    topic = models.CharField(max_length=50)
    meaning = models.TextField()
    sentence = models.TextField()

    def __str__(self):
        return '{} {} {}'.format(self.category, self.usage, self.topic)
