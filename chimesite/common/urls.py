from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^countryhaszip/', views.country_has_zip, name='haszip'),
]