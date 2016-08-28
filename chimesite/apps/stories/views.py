from django.shortcuts import render
from django.http import HttpResponse
from apps.common import utils
from models import SimpleStory
import json

def list_stories(request):
    in_dict = handle_json(request)
    country_code = in_dict.get('country_code', None)
    if country_code is None:
        return HttpResponse('Could not get country code.')
    country_stories = SimpleStory.objects.filter(location__country__phone_code=country_code)
    selected_stories = utils.to_three(country_stories)
    story_dump = {}
    for story in selected_stories:
        story_dump[story.id] = story.snippet
    story_dump['more'] = len(country_stories) > len(selected_stories)
    return HttpResponse(json.dumps(story_dump))

def get_story(request):
    in_dict = handle_json(request)
    return HttpResponse('No story found')
