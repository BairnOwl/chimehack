from __future__ import unicode_literals

from django.db import models

from apps.users.models import Author

# Create your models here.

class SimpleStory(models.Model):

    story_text = models.TextField()
    author = models.ForeignKey(Author)

AVAILABLE_KEYWORDS = [('hsb', 'Husband')]

class Keyword(models.Model):
    text = models.CharField(max_length=200)
    story = models.ForeignKey(SimpleStory, choices=AVAILABLE_KEYWORDS)