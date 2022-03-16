from django.shortcuts import get_object_or_404
from rest_framework.generics import ListAPIView
from restaurants.models import Blog
from restaurants.serializers import BlogSerializer
from rest_framework.pagination import CursorPagination


class CursorSetPagination(CursorPagination):
    page_size = 10
    page_size_query_param = "page_size"
    ordering = "date"


class GetBlogPostListView(ListAPIView):
    serializer_class = BlogSerializer
    pagination_class = CursorSetPagination

    def get_queryset(self):
        return Blog.objects.filter(restaurant=self.kwargs["restaurant_id"]).order_by("-date").all()