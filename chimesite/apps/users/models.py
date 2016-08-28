from __future__ import unicode_literals

from django.db import models

# Create your models here.

class BaseUser(models.Model):

    first_name = models.TextField(null=True)
    last_name = models.TextField(null=True)

class Author(models.Model):

    source_number = models.CharField(max_length=13)

