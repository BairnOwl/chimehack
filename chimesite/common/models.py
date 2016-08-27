from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Country(models.Model):
    long_name = models.TextField()
    abbrev_name = models.CharField(max_length=2)
    has_postcode = models.BooleanField(default=True)


class Location(models.Model):

    country = models.ForeignKey(Country)
    state = models.TextField()
    district = models.TextField()
    postal_code = models.CharField(max_length=10)
    city = models.TextField()

    def uses_zip(self):
        return self.country.has_postcode