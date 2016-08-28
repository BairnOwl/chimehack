from __future__ import unicode_literals

from django.db import models

from apps.common.models import Location

# Create your models here.

class Organization(models.Model):
    name = models.TextField()
    phone_number = models.CharField(max_length=13)
    location = models.ForeignKey(Location)
    description = models.TextField()
    services = models.TextField()
