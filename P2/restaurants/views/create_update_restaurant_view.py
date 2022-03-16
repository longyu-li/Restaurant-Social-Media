from rest_framework.exceptions import PermissionDenied
from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView
from restaurants.serializers import RestaurantSerializer
from rest_framework.permissions import IsAuthenticated

# Create your views here.


class CreateUpdateRestaurantView(CreateAPIView, RetrieveUpdateDestroyAPIView):

    serializer_class = RestaurantSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        try:
            serializer.save(user=self.request.user)
        except:
            raise PermissionDenied

    def get_object(self):
        return self.request.user.restaurant

