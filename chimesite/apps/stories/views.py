from django.shortcuts import render
from django.http import HttpResponse
from apps.common import utils
from models import SimpleStory
import json
import random

def story_dump(stories):
    subset = random.sample(stories, 3)
    story_dump = {}
    for story in subset:
        story_dump[story.id] = story.snippet
    return HttpResponse(json.dumps(story_dump))

def list_stories(request):
    in_code = utils.handle_url(request)
    try:
        country_code = int(in_code)
    except:
        return HttpResponse('Could not get country code.')
    country_stories = SimpleStory.objects.filter(location__phone_code=country_code)
    return story_dump(country_stories)

def _retrieve_story(request):
    story_id = utils.handle_url(request)
    try:
        story = SimpleStory.objects.get(id=story_id)
        return story
    except:
        return HttpResponse('No story matching the given id exists.')

def get_story(request):
    story = _retrieve_story(request)
    return HttpResponse(story.story_text)


def get_similar(request):
    matching_story = _retrieve_story(request)
    filtered_stories = SimpleStory.objects.filter(primary_keyword=matching_story.primary_keyword)
    if len(filtered_stories) > 3 and matching_story.secondary_keyword:
        filtered_stories = by_primary.filter(secondary_keyword=matching_story.secondary_keyword)
        if len(filtered_stories) > 3 and matching_story.tertiary_keyword:
            filtered_stories = by_secondary.filter(tertiary_keyword=matching_story.tertiary_keyword)
    return story_dump(filtered_stories)
