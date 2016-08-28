from __future__ import unicode_literals

from django.db import models
from apps.common.models import Location

# Create your models here.

class SimpleStory(models.Model):

    story_text = models.TextField()
    keywords = models.TextField()
    location = models.ForeignKey(Location)
    snippet = models.CharField(max_length=160)