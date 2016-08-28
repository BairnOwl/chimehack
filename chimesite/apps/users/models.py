from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Author(models.Model):

    alias_name = models.CharField(max_length=200)
    callback_number = models.CharField(max_length=13)

    def __unicode__(self):
        return self.alias_name + ": " + self.callback_number

