import json

from django.http import HttpResponse

import models, utils


# Create your views here.

def country_emergency_number(request):
    country_code = utils.handle_url(request)
    try:
        country_obj = models.Country.objects.get(phone_code=country_code)
    except:
        return HttpResponse('Could not get country matching code.')
    return HttpResponse(country_obj.emergency_number)
