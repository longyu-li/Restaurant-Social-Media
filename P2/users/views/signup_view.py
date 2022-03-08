from rest_framework.generics import CreateAPIView

from users.serializers import SignupSerializer


class SignupView(CreateAPIView):

    serializer_class = SignupSerializer
