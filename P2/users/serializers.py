from django.core.exceptions import ValidationError as DjangoValidationError
from django.contrib.auth import password_validation
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from users.models import RestifyUser


class UserSerializer(serializers.ModelSerializer):

    password1 = serializers.CharField(trim_whitespace=False, write_only=True)
    password2 = serializers.CharField(trim_whitespace=False, write_only=True)

    class Meta:

        model = RestifyUser
        fields = [
            "first_name",
            "last_name",
            "email",
            "avatar",
            "phone_num",
            "password1",
            "password2",
        ]

    def __init__(self, *args, **kwargs):

        super().__init__(*args, **kwargs)

        request = self.context["request"]

        if request.method != "POST":
            self.fields["email"].read_only = True

    # adapted from django.contrib.auth.forms.UserCreationForm
    def validate(self, attrs):
        password1 = attrs.get("password1")
        password2 = attrs.get("password2")

        if password1 and password2:

            if password1 != password2:

                raise ValidationError(
                    {"password2": "The two password fields didn't match."}
                )

            try:

                request = self.context["request"]

                if request.method != "POST":
                    password_validation.validate_password(password2, request.user)
                else:
                    password_validation.validate_password(password2, RestifyUser(
                        first_name=attrs["first_name"],
                        last_name=attrs["last_name"],
                        email=attrs["email"],
                        phone_num=attrs["phone_num"]
                    ))

            except DjangoValidationError as error:
                raise ValidationError({"password2": error.messages})

        return attrs

    def create(self, validated_data):

        new_user: RestifyUser = RestifyUser.objects.create_user(
            validated_data["email"],
            validated_data["email"],
            validated_data["password1"],
        )

        new_user.first_name = validated_data["first_name"]
        new_user.last_name = validated_data["last_name"]
        new_user.avatar = validated_data["avatar"]
        new_user.phone_num = validated_data["phone_num"]

        new_user.save()

        return new_user

    def update(self, instance, validated_data):

        password = validated_data.get("password1")
        if password:
            instance.set_password(password)

        return super().update(instance, validated_data)
