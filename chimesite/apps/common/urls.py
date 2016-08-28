from django.conf.urls import url

import views

urlpatterns = [
    url(r'^countryhaszip/', views.country_has_zip, name='haszip'),
]