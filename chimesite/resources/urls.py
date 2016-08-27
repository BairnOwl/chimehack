from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^matchorg/', views.get_organization, name='matchorg')
]