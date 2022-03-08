from django.core.exceptions import ValidationError as DjangoValidationError
from django.contrib.auth import password_validation
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from users.models import RestifyUser


class SignupSerializer(serializers.ModelSerializer):

    password1 = serializers.CharField(trim_whitespace=False, write_only=True)
    password2 = serializers.CharField(trim_whitespace=False, write_only=True)

    class Meta:

        model = RestifyUser
        fields = ["first_name", "last_name", "email", "avatar", "phone_num",
                  "password1", "password2"]

    # adapted from django.contrib.auth.forms.UserCreationForm
    def validate(self, attrs):
        password1 = attrs["password1"]
        password2 = attrs["password2"]

        if password1 and password2 and password1 != password2:
            raise ValidationError({"password2": "The two password fields didn't match."})

        try:
            password_validation.validate_password(password2, self.instance)
        except DjangoValidationError as error:
            raise ValidationError({"password2", error})

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
