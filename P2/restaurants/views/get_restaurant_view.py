from django.shortcuts import get_object_or_404
from rest_framework.generics import RetrieveAPIView
from restaurants.serializers import RestaurantSerializer
from restaurants.models import Restaurant
class GetRestaurantView(RetrieveAPIView):

    serializer_class = RestaurantSerializer

    def get_object(self):
        return get_object_or_404(Restaurant, id=self.kwargs['restaurant_id'])
        