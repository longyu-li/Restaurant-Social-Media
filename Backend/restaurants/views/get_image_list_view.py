from django.shortcuts import get_object_or_404
from rest_framework.generics import ListAPIView
from restaurants.models import Image, Restaurant
from restaurants.serializers import ImageSerializer
from rest_framework.pagination import CursorPagination


class CursorSetPagination(CursorPagination):
    page_size = 6
    page_size_query_param = "page_size"
    ordering = "-id"


class GetImageListView(ListAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    pagination_class = CursorSetPagination

    def get_queryset(self):
        restaurant = get_object_or_404(Restaurant, id=self.kwargs["restaurant_id"])
        return restaurant.image_set.all()
