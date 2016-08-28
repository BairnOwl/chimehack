"""
WSGI config for chimesite project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.10/howto/deployment/wsgi/
"""

import os
import sys

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "chimesite.settings")

sys.path.insert(1, os.path.dirname(os.path.realpath(__file__)))

# from dj_static import Cling
# application = Cling(get_wsgi_application())

from whitenoise.django import DjangoWhiteNoise

application = get_wsgi_application()
application = DjangoWhiteNoise(application)