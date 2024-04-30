from django.shortcuts import get_object_or_404
from rest_framework.generics import DestroyAPIView
from restaurants.models import Tag
from restaurants.serializers import TagSerializer
from rest_framework.permissions import IsAuthenticated
from restaurants.permissions import IsOwnerOrReadOnly


class DeleteTagView(DestroyAPIView):
    serializer_class = TagSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def get_object(self):
        obj = get_object_or_404(Tag, id=self.kwargs["tag_id"])
        self.check_object_permissions(self.request, obj)
        return obj
