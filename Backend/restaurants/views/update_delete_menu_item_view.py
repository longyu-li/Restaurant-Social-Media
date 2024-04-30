from django.shortcuts import get_object_or_404
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from restaurants.models import MenuItem
from restaurants.serializers import MenuItemSerializer
from rest_framework.permissions import IsAuthenticated
from restaurants.permissions import IsOwnerOrReadOnly
from notifications.models import Menu as NMenu

class UpdateDeleteMenuItemView(RetrieveUpdateDestroyAPIView):
    serializer_class = MenuItemSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def get_object(self):
        obj = get_object_or_404(MenuItem, id=self.kwargs["menu_item_id"])
        self.check_object_permissions(self.request, obj)
        return obj

    def delete(self, request, *args, **kwargs):
        instance: MenuItem = self.get_object()
        followers = instance.restaurant.follows.all()
        for f in followers:
            NMenu(owner=f, restaurant=instance.restaurant, menu=instance, change="d").save()
        return super().delete(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        instance: MenuItem = self.get_object()
        followers = instance.restaurant.follows.all()
        for f in followers:
            NMenu(owner=f, restaurant=instance.restaurant, menu=instance, change="u").save()
        return super().put(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        instance: MenuItem = self.get_object()
        followers = instance.restaurant.follows.all()
        for f in followers:
            NMenu(owner=f, restaurant=instance.restaurant, menu=instance, change="u").save()
        return super().patch(request, *args, **kwargs)