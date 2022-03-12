from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated

from users.serializers import UserSerializer


class GetUpdateUserView(RetrieveUpdateAPIView):

    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):

        return self.request.user
