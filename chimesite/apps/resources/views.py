from django.http import HttpResponse


def get_organization(request):
    return HttpResponse("Could not find an organization for this information.")
