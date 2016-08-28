from __future__ import unicode_literals

from django.db import models

# Create your models here.

class SimpleStory(models.Model):

    story_text = models.TextField()
    keywords = models.TextField()