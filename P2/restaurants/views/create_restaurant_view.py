from urllib import request
from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from restaurants.serializers import RestaurantSerializer
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
# Create your views here.

class CreateRestaurantView(CreateAPIView):

    serializer_class = RestaurantSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
