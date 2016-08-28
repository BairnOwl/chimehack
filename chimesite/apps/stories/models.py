from __future__ import unicode_literals

from django.db import models
from apps.common.models import Country
from apps.users.models import Author

# Create your models here.

PRIMARY_CHOICES = [('D', 'domestic'), ('C', 'community')]
RESULT_CHOICES = [('J', 'Justice'), ('S', 'Safety'), ('F', 'Family/Custody')]
SUBTYPE_CHOICES = [('cust', 'Custody'), ('gr', 'Gang Rape')]

class SimpleStory(models.Model):

    story_text = models.TextField()
    location = models.ForeignKey(Country, null=True)
    snippet = models.CharField(max_length=160)
    violence_type = models.CharField(max_length=200,
        choices=PRIMARY_CHOICES, default='D')
    result_type = models.CharField(max_length=200, 
        null=True, choices=RESULT_CHOICES, blank=True)
    additional_info = models.CharField(max_length=200,
        null=True, choices=SUBTYPE_CHOICES, blank=True)
    author = models.ForeignKey(Author, null=True, blank=True)

    def __unicode__(self):
        return str(self.location) + ": " + self.snippet[:20] + "..."