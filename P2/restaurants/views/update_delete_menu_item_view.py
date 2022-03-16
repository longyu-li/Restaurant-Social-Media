from django.shortcuts import get_object_or_404
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from restaurants.models import MenuItem
from restaurants.serializers import MenuItemSerializer
from rest_framework.permissions import IsAuthenticated
from restaurants.permissions import IsOwnerOrReadOnly


class UpdateDeleteMenuItemView(RetrieveUpdateDestroyAPIView):
    serializer_class = MenuItemSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def get_object(self):
        obj = get_object_or_404(MenuItem, id=self.kwargs["menu_item_id"])
        self.check_object_permissions(self.request, obj)
        return obj
