import json
from http import HTTPStatus

from django.urls import reverse_lazy

from shared.authed_test import AuthedAPITestCase
from shared.constants import get_signup_req, signin_req, signup_req


class UpdateUserTests(AuthedAPITestCase):
    def setUp(self) -> None:

        self.client.post(reverse_lazy("users_signup"), get_signup_req())
        self.login(signin_req)

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

    def test_success(self):

        req = {
            "password1": "pswd^119",
            "password2": "pswd^119",
            "password": signin_req["password"],
        }

        res = self.client.patch(reverse_lazy("users_get_update"), req)

        self.assertEqual(res.status_code, HTTPStatus.OK)

        self.client.credentials()

        self.login(
            {
                "email": signup_req["email"],
                "password": req["password2"],
            }
        )
