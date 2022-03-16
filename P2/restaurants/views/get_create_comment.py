from django.shortcuts import get_object_or_404
from rest_framework.generics import CreateAPIView, ListAPIView
from restaurants.permissions import IsAuthenticatedOrReadOnly
from restaurants.serializers import CommentSerializer
from restaurants.models import Comment, Restaurant
from rest_framework.pagination import CursorPagination
from notifications.models import Comment as NotifComment


class CursorSetPagination(CursorPagination):
    page_size = 10
    page_size_query_param = "page_size"
    ordering = "-date"


class GetCreateCommentsView(CreateAPIView, ListAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = CursorSetPagination

    def perform_create(self, serializer):
        restaurant = get_object_or_404(Restaurant, pk=self.kwargs["restaurant_id"])
        comment = serializer.save(restaurant=restaurant, owner=self.request.user)
        NotifComment(
            owner=restaurant.user, user=self.request.user, comment=comment
        ).save()

    def get_queryset(self):
        return Comment.objects.filter(restaurant=self.kwargs["restaurant_id"])
