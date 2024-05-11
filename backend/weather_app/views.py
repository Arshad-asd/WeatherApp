import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime
import pycountry


class WeatherDataAPIView(APIView):
    def get(self, request, city):
        date = request.query_params.get('date')
        api_key = '811eb41238a3b2089a94134f99cfcb87'

        # Construct the URL with the provided date
        url = f'http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}'
        if date:
            url += f'&dt={date}'

        try:
            response = requests.get(url)
            data = response.json()
            print(data)

            if response.status_code == 200:
                weather_data = {
                    'date': date if date else datetime.now().strftime('%Y-%m-%d'),
                    'temperature': data['main']['temp'],
                    'humidity': data['main']['humidity'],
                    'wind_speed': data['wind']['speed'],
                    'pressure': data['main']['pressure'],
                    # Add more fields as needed
                }
                return Response(weather_data)
            else:
                return Response({'error': 'Failed to fetch weather data'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CountryWeatherAPIView(APIView):
    def get(self, request, country_name):
        api_key = '811eb41238a3b2089a94134f99cfcb87'

        # Get the ISO 3166-1 alpha-2 country code from the country name
        try:
            country = pycountry.countries.search_fuzzy(country_name)[0]
            country_code = country.alpha_2
        except LookupError:
            return Response({'error': 'Invalid country name'}, status=status.HTTP_400_BAD_REQUEST)

        # Define bounding box coordinates for the country
        # You can find the bounding box coordinates for each country online or calculate them programmatically
        # Here's an example bounding box for India:
        # bbox = {'lon_left': 68.111378, 'lat_bottom': 6.75469, 'lon_right': 97.395358, 'lat_top': 35.67453}

        # Construct the URL with the bounding box and the API key
        url = f'http://api.openweathermap.org/data/2.5/box/city?bbox={lon_left},{lat_bottom},{lon_right},{lat_top},10&appid={api_key}'

        try:
            response = requests.get(url)
            data = response.json()

            if response.status_code == 200:
                # Extract weather data for each city from the response
                cities_weather_data = []
                for city in data['list']:
                    city_weather = {
                        'city_name': city['name'],
                        'temperature': city['main']['temp'],
                        'humidity': city['main']['humidity'],
                        'wind_speed': city['wind']['speed'],
                        'pressure': city['main']['pressure'],
                        # Add more fields as needed
                    }
                    cities_weather_data.append(city_weather)

                return Response(cities_weather_data)
            else:
                return Response({'error': 'Failed to fetch weather data'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
