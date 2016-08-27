from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Location(models.Model):

    country = models.TextField()
    state = models.TextField()
    district = models.TextField()
    zip_code = models.CharField(max_length=8)
    city = models.TextField()

    def country_uses_zip(self):
        return True

