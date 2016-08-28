from django.conf.urls import url

from apps.stories import views

urlpatterns = [
    url(r'^list/', views.list_stories, name='liststories'),
    url(r'^single/', views.get_story, name='singlestory'),
    url(r'^similar/', views.get_similar, name='similarstory'),
]