from django.db import models


class Template(models.Model):
    category = models.CharField(max_length=50)
    topic = models.CharField(max_length=200)
    template = models.TextField()
    translation = models.TextField()

    done = models.BooleanField(default=0)

    def __str__(self):
        if self.done == 0:
            status = 'Not Done'
        elif self.done == 1:
            status = 'Done'
        return '{} - {}'.format(self.category, status)
