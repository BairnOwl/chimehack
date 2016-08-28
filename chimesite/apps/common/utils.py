import json
import random

class ContentException(Exception):
    pass

def handle_json(input_request):
    json_str = input_request.body
    try:
        json.dumps(json_str)
    except Exception as e:
        raise ContentException('Could not parse content with error %s' % e)

def to_three(in_set):
    if len(in_set) > 3:
        in_set = random.sample(in_set, 3)
    return in_set
