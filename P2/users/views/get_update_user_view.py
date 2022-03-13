from http import HTTPStatus

from rest_framework.exceptions import APIException
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated

from users.serializers import UserSerializer


class CurrentPasswordException(APIException):

    status_code = HTTPStatus.BAD_REQUEST
    default_detail = "Current password must be provided."


class GetUpdateUserView(RetrieveUpdateAPIView):

    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):

        return self.request.user

    def put(self, request, *args, **kwargs):

        if not request.user.check_password(request.data.get("password")):
            raise CurrentPasswordException

        return super().put(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):

        if not request.user.check_password(request.data.get("password")):
            raise CurrentPasswordException

        return super().patch(request, *args, **kwargs)
