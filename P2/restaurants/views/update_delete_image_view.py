
from django.shortcuts import get_object_or_404
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from restaurants.models import Image
from restaurants.serializers import ImageSerializer
from rest_framework.permissions import IsAuthenticated
from restaurants.permissions import IsOwnerOrReadOnly

class UpdateDeleteImageView(RetrieveUpdateDestroyAPIView):
    serializer_class = ImageSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def get_object(self):
        obj = get_object_or_404(Image, id=self.kwargs['image_id'])
        self.check_object_permissions(self.request, obj)
        return obj