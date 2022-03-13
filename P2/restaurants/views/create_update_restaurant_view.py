
from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView
from restaurants.serializers import RestaurantSerializer
from rest_framework.permissions import IsAuthenticated
# Create your views here.

class CreateUpdateRestaurantView(CreateAPIView, RetrieveUpdateAPIView):

    serializer_class = RestaurantSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_object(self):
        return self.request.user.restaurant