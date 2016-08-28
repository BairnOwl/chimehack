from django.http import HttpResponse
from apps.common import utils
from .models import Organization
import json
import random


def get_organization(request):
    country_val = utils.handle_json(request)
    if country_val is None:
        return HttpResponse('No country was given.')
    by_country = utils.filter_down(Organization.objects,
                           location__country__phone_code, country_val)
    state_val = in_dict.get('state', None)
    by_state = utils.filter_down(by_country, location__state, state_val)
    district = in_dict.get('district', None)
    by_district = utils.filter_down(by_state, location__district, district)
    city = in_dict.get('city', None)
    by_city = utils.filter_down(by_district, location__city, city)
    org_dump = {}
    for org in by_city:
        org_dump[org.id] = org.phone_number
    return HttpResponse(json.dumps(org_dump))


def get_org_info(request):
    key = utils.handle_json(request)
    if key is None:
        return HttpResponse("No organization key was given.")
    try:
        org_obj = Organization.objects.get(id=key)
    except Exception:
        return HttpResponse("Could not get an organization with this key.")
    info_dump = json.dumps({u'name': org_obj.name,
                            u'phone_number': org_obj.phone_number,
                            u'location': org_obj.location.loc_detail(),
                            u'description': org_obj.description,
                            u'services': org_obj.services})
    return HttpResponse(info_dump)

