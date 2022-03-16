from rest_framework.generics import ListAPIView
from restaurants.models import Blog
from restaurants.serializers import BlogSerializer
from rest_framework.pagination import CursorPagination


class CursorSetPagination(CursorPagination):
    page_size = 10
    page_size_query_param = "page_size"
    ordering = "-date"


class FeedView(ListAPIView):
    serializer_class = BlogSerializer
    pagination_class = CursorSetPagination

    def get_queryset(self):
        restaurants = self.request.user.followed_restaurants.all()
        ids = [r.id for r in restaurants]
        return Blog.objects.filter(restaurant__in=ids).all()
