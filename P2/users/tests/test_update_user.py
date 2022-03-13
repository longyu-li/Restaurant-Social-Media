import json
from http import HTTPStatus

from django.urls import reverse_lazy
from rest_framework.test import APITestCase

from users.tests.constants import get_signup_req, signin_req


class UpdateUserTests(APITestCase):

    def setUp(self) -> None:

        signup_req = get_signup_req()

        self.client.post(reverse_lazy("users_signup"), signup_req)
        res = self.client.post(reverse_lazy("users_signin"), signin_req)

        tokens = json.loads(res.content)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {tokens['access']}")

    def test_missing_passwords(self):

        req = {
            "password1": "pswd^119",
            "password2": "",
        }

        res = self.client.patch(reverse_lazy("users_get_update"), req)

        self.assertEqual(res.status_code, HTTPStatus.BAD_REQUEST)

        req["password2"] = req["password1"]
        req["password1"] = ""

        res = self.client.patch(reverse_lazy("users_get_update"), req)

        self.assertEqual(res.status_code, HTTPStatus.BAD_REQUEST)

