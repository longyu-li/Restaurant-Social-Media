from django.shortcuts import get_object_or_404
from rest_framework.generics import ListAPIView
from restaurants.models import MenuItem, Restaurant
from restaurants.serializers import MenuItemSerializer
from rest_framework.pagination import CursorPagination

class CursorSetPagination(CursorPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    ordering = 'id'

class GetMenuListView(ListAPIView):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer
    pagination_class = CursorSetPagination

    def get_queryset(self):
        restaurant = get_object_or_404(Restaurant, id=self.kwargs['restaurant_id'])
        return restaurant.menuitem_set.all()