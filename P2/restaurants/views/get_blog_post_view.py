from django.shortcuts import get_object_or_404
from rest_framework.generics import RetrieveAPIView
from restaurants.serializers import BlogSerializer
from rest_framework.permissions import IsAuthenticated
from restaurants.models import Blog


class GetBlogPostView(RetrieveAPIView):

    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(Blog, id=self.kwargs["blog_id"])
