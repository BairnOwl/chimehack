from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Organization(models.Model):
    name = models.TextField()
    phone_number = models.CharField(max_length=13)

