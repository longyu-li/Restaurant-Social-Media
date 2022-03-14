from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, authentication_classes
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from restaurants.models import Restaurant, Blog


# https://piazza.com/class/kwh095qkvqb2a8?cid=528 - design dec: restrict

@api_view(["GET", "POST"])
@authentication_classes([IsAuthenticated])
def like_restaurant(request):

    restaurant = get_object_or_404(Restaurant, pk=request.kwargs["restaurant_id"])
    liked = restaurant.likes.contains(request.user)

    match request.method:

        case "GET":

            return Response(liked)

        case "POST":

            if restaurant.user == request.user:
                raise ValidationError("You cannot like your own restaurant.")

            if liked:
                restaurant.likes.remove(request.user)
            else:
                restaurant.likes.add(request.user)

            return Response(not liked)


@api_view(["GET", "POST"])
@authentication_classes([IsAuthenticated])
def follow_restaurant(request):

    restaurant = get_object_or_404(Restaurant, pk=request.kwargs["restaurant_id"])
    followed = restaurant.follows.contains(request.user)

    match request.method:

        case "GET":

            return Response(followed)

        case "POST":

            if restaurant.user == request.user:
                raise ValidationError("You cannot follow your own restaurant.")

            if followed:
                restaurant.follows.remove(request.user)
            else:
                restaurant.follows.add(request.user)

            return Response(not followed)


@api_view(["GET", "POST"])
@authentication_classes([IsAuthenticated])
def like_blog(request):

    blog = get_object_or_404(Blog, pk=request.kwargs["blog_id"])
    liked = blog.likes.contains(request.user)

    match request.method:

        case "GET":

            return Response(liked)

        case "POST":

            if blog.restaurant.user == request.user:
                raise ValidationError("You cannot like your own restaurant's post.")

            if liked:
                blog.likes.remove(request.user)
            else:
                blog.likes.add(request.user)

            return Response(not liked)
