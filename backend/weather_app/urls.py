from django.urls import path
from weather_app.views import *

urlpatterns = [
    path('fetch/<str:city>/', WeatherDataAPIView.as_view(),name='fetch-weather-data'),


]