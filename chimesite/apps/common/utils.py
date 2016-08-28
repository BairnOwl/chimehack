import json
import random

class ContentException(Exception):
    pass

def handle_json(input_request):
    json_str = input_request.body
    try:
        return json.dumps(json_str)
    except Exception as e:
        raise ContentException('Could not parse content with error %s' % e)

def handle_url(input_request):
    split_path = input_request.path.split('/')
    last_item = split_path[-1]
    return last_item

def to_three(in_set):
    if len(in_set) > 3:
        in_set = random.sample(in_set, 3)
    return in_set

def filter_down(object_set, parameter, value):
    if len(object_set) > 3 and value:
        new_set = object_set.filter(parameter=value)
        if len(new_set) >= 3:
            object_set = new_set
    return object_set
