import json

class ContentException(Exception):
    pass

def handle_json(input_request):
    json_str = input_request.content
    try:
        json.dumps(json_str)
    except Exception as e:
        raise ContentException('Could not parse content with error %s' % e)
