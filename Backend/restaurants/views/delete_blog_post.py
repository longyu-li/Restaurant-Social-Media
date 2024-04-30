from django.shortcuts import get_object_or_404
from rest_framework.generics import DestroyAPIView
from restaurants.models import Blog
from restaurants.serializers import BlogSerializer
from rest_framework.permissions import IsAuthenticated
from restaurants.permissions import IsOwnerOrReadOnly


class DeleteBlogPostView(DestroyAPIView):
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def get_object(self):
        obj = get_object_or_404(Blog, id=self.kwargs["blog_id"])
        self.check_object_permissions(self.request, obj)
        return obj
