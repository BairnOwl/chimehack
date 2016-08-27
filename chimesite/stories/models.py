from __future__ import unicode_literals

from django.db import models

from chimesite.users.models import Author

# Create your models here.

class SimpleStory(models.Model):

    story_text = models.TextField()
    author = models.ForeignKey(Author)
