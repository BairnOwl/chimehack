from django.conf.urls import url

from apps.resources import views

urlpatterns = [
    url(r'^matchorg', views.get_organization, name='matchorg'),
    url(r'^info/', views.get_org_info, name='orginfo'),
]