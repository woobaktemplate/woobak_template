from django.db import models


class Template(models.Model):
    category = models.CharField(max_length=50)
    topic = models.CharField(max_length=200)
    template = models.TextField()
    translation = models.TextField()

    def __str__(self):
        return '{}'.format(self.category)
