from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from users.serializers import UserSerializer
# Create your views here.

class CreateRestaurantView(CreateAPIView):

    serializer_class = UserSerializer
