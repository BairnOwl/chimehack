from django.apps import AppConfig


class WritersConfig(AppConfig):
    name = 'users'


class StoriesConfig(AppConfig):
    name = 'stories'


class ResourcesConfig(AppConfig):
    name = 'resources'

class CommonConfig(AppConfig):
    name = 'common'