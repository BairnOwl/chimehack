from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse

# Create your views here.

def get_organization(request):
    return HttpResponse("Could not find an organization for this information.")