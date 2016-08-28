from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Country(models.Model):
    long_name = models.TextField()
    abbrev_name = models.CharField(max_length=2)
    default_language = models.TextField(default='English')
    phone_code = models.IntegerField()
    emergency_number = models.IntegerField()

    def __unicode__(self):
        return self.long_name


class Location(models.Model):

    country = models.ForeignKey(Country)
    state = models.TextField(blank=True, null=True)
    district = models.TextField(blank=True, null=True)
    city = models.TextField(blank=True, null=True)

    def loc_detail(self):
        return self.city

    def __unicode__(self):
        return '%s: %s, %s' % (str(self.country), self.state, self.city)