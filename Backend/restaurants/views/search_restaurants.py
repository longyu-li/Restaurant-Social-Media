from rest_framework.generics import ListAPIView
from restaurants.models import MenuItem, Restaurant, Tag
from restaurants.serializers import RestaurantSerializer
from rest_framework.pagination import CursorPagination
from rest_framework.exceptions import APIException
from http import HTTPStatus
from django.db.models import Value
from django.db.models.functions import Concat
from django.db.models.aggregates import Count
from django.db.models import Q


class CursorSetPagination(CursorPagination):
    page_size = 100
    page_size_query_param = "page_size"
    ordering = "-q_count"


class SearchRestaurantsView(ListAPIView):
    serializer_class = RestaurantSerializer
    pagination_class = CursorSetPagination

    def get_queryset(self):
        query = self.request.query_params
        try:
            search = query["search"]
            kind = query["type"]
        except KeyError:
            ex = APIException("Missing query params")
            ex.status_code = HTTPStatus.BAD_REQUEST
            raise ex
        match kind:
            case "food":
                tags = Tag.objects.filter(tag__icontains=search)
                mitems = MenuItem.objects.filter(Q(name__icontains=search) | Q(description__icontains=search))
                restaurants = [x.restaurant.id for x in tags] + [x.restaurant.id for x in mitems]
                return Restaurant.objects.annotate(q_count=Count('follows')).filter(pk__in=restaurants)
            case "address":
                return Restaurant.objects.annotate(q_count=Count('follows')).filter(address__icontains=search)
            case "name":
                return Restaurant.objects.annotate(q_count=Count('follows')).filter(name__icontains=search)
            case _:
                ex = APIException("Incorrect search type")
                ex.status_code = HTTPStatus.BAD_REQUEST
                raise ex
