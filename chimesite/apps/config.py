from django.apps import AppConfig


class WritersConfig(AppConfig):
    name = 'apps.users'


class StoriesConfig(AppConfig):
    name = 'apps.stories'


class ResourcesConfig(AppConfig):
    name = 'apps.resources'

class CommonConfig(AppConfig):
    name = 'apps.common'