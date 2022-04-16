from rest_framework.generics import ListAPIView
from restaurants.models import Restaurant, Tag
from restaurants.serializers import RestaurantSerializer
from rest_framework.pagination import CursorPagination
from rest_framework.exceptions import APIException
from http import HTTPStatus
from django.db.models import Value
from django.db.models.functions import Concat
from django.db.models.aggregates import Count


class CursorSetPagination(CursorPagination):
    page_size = 10
    page_size_query_param = "page_size"
    ordering = "-likes"


class SearchRestaurantsView(ListAPIView):
    serializer_class = RestaurantSerializer
    pagination_class = CursorSetPagination

    def get_queryset(self):
        print(self.kwargs)
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
                restaurants = [tag.restaurant.id for tag in tags]
                return Restaurant.objects.annotate(q_count=Count('follows')).order_by("q_count").filter(pk__in=restaurants)
            case "address":
                return Restaurant.objects.annotate(q_count=Count('follows')).order_by("q_count").filter(address__icontains=search)
            case "name":
                return Restaurant.objects.annotate(q_count=Count('follows')).order_by("q_count").filter(name__icontains=search)
            case _:
                ex = APIException("Incorrect search type")
                ex.status_code = HTTPStatus.BAD_REQUEST
                raise ex
