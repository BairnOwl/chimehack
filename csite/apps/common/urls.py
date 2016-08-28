from django.conf.urls import url

import views

urlpatterns = [
    url(r'^emergency/', views.country_emergency_number, name='emergencynumber'),
]