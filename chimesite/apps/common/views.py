import json

from django.http import HttpResponse

from chimesite.apps.common import models, utils


# Create your views here.

def country_has_zip(request):
    try:
        content_dict = utils.handle_json(request)
    except Exception as e:
        return HttpResponse(content='Incorrect request', reason='JSON would not parse',
                            reason_phrase=e)
    try:
        country_obj = models.Country.objects.get(long_name=content_dict['country'])
    except:
        try:
            country_obj = models.Country.objects.get(abbrev_name=content_dict['country'])
        except:
            return HttpResponse(content='Incorrect request, could not get country from database',
                                reason='Could not get country')
    return HttpResponse(content=json.dumps({'has_postcode': str(country_obj.has_postcode),
                                            'country': content_dict['country']}))
