from django.shortcuts import render
from django.http import HttpResponse
from apps.common import utils
from models import SimpleStory
import json

def story_dump(stories):
    story_dump = {}
    for story in stories:
        story_dump[story.id] = story.snippet
    return HttpResponse(json.dumps(story_dump))

def list_stories(request):
    in_dict = utils.handle_json(request)
    country_code = in_dict.get('country_code', None)
    if country_code is None:
        return HttpResponse('Could not get country code.')
    country_stories = SimpleStory.objects.filter(location__country__phone_code=country_code)
    return story_dump(country_stories)

def _retrieve_story(request):
    in_dict = utils.handle_json(request)
    story_id = in_dict.get('story_id', None)
    if story_id is None:
        return HttpResponse('No story id was given.')
    try:
        story = SimpleStory.objects.get(id=story_id)
    except:
        return HttpResponse('No story matching the given id exists.')


def get_story(request):
    story = _retrieve_story(request)
    return HttpResponse(story.story_text)


def get_similar(request):
    matching_story = _retrieve_story(request)
    by_primary = utils.filter_down(matching_story, primary_keyword, matching_story.primary_keyword)
    by_secondary = utils.filter_down(matching_story, secondary_keyword, matching_story.secondary_keyword)
    by_tertiary = utils.filter_down(matching_story, tertiary_keyword, matching_story.tertiary_keyword)
    return story_dump(by_tertiary)
