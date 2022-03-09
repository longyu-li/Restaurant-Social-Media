from rest_framework.generics import CreateAPIView

from users.serializers.signup_serializer import SignupSerializer


class SignupView(CreateAPIView):

    serializer_class = SignupSerializer
