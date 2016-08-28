from django.http import HttpResponse
from apps.common import utils
from .models import Organization
import json
import random


def get_organization(request):
    available_filters = utils.handle_query_url(request)
    cur_obj = Organization.objects.all()
    for key_val in available_filters:
        if len(cur_obj) > 3:
            if key_val[0] == 'country':
                cur_obj = cur_obj.filter(location__country__phone_code=key_val[1])
            elif key_val[0] == 'state':
                cur_obj = cur_obj.filter(location__state=key_val[1])
            elif key_val[0] == 'district':
                cur_obj = cur_obj.filter(location__district=key_val[1])
            elif key_val[0] == 'city':
                cur_obj = cur_obj.filter(location__city=key_val[1])
    org_dump = {}
    for org in cur_obj:
        org_dump[org.id] = [org.phone_number, org.name]
    return HttpResponse(json.dumps(org_dump))


def get_org_info(request):
    key = utils.handle_url(request)
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

