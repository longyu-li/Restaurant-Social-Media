from django.shortcuts import get_object_or_404
from rest_framework.generics import ListAPIView
from restaurants.models import Blog
from restaurants.serializers import BlogSerializer
from rest_framework.pagination import CursorPagination


class CursorSetPagination(CursorPagination):
    page_size = 10
    page_size_query_param = "page_size"
    ordering = "date"


class GetImageListView(ListAPIView):
    queryset = Blog.objects.order_by("-date").all()
    serializer_class = BlogSerializer
    pagination_class = CursorSetPagination
