from django.http import HttpResponse
from apps.common import utils
from .models import Organization
import json
import random


def get_organization(request):
    in_dict = utils.handle_json(request)
    country_val = in_dict.get('country_code', None)
    if country_val is None:
        return HttpResponse('No country was given.')
    by_country = _filter_down(Organization.objects,
                           location__country__phone_code, country_val)
    state_val = in_dict.get('state', None)
    by_state = _filter_down(by_country, location__state, state_val)
    district = in_dict.get('district', None)
    by_district = _filter_down(by_state, location__district, district)
    city = in_dict.get('city', None)
    by_city = _filter_down(by_district, location__city, city)
    by_city = utils.to_three(by_city)
    org_dump = {}
    for org in by_city:
        org_dump[org.id] = org.phone_number
    return HttpResponse(json.dumps(org_dump))


def _filter_down(object_set, parameter, value):
    if len(object_set) > 3:
        new_set = object_set.filter(parameter=value)
        if len(new_set) >= 3:
            object_set = new_set
    return object_set


def get_org_info(request):
    in_dict = utils.handle_json(request)
    key = in_dict.get('org_key', None)
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

