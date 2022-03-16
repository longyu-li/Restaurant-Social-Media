import json
from http import HTTPStatus

from django.urls import reverse_lazy
from rest_framework.test import APITestCase

from shared.constants import get_signup_req


class SignupTests(APITestCase):
    def test_empty(self):

        res = self.client.post(reverse_lazy("users_signup"))
        self.assertEqual(res.status_code, HTTPStatus.BAD_REQUEST)

        res_json: dict = json.loads(res.content)
        self.assertEqual(len(res_json), 7)

    def test_success(self):

        res = self.client.post(reverse_lazy("users_signup"), get_signup_req())

        self.assertEqual(res.status_code, HTTPStatus.CREATED)

    def test_dup_email(self):

        diff_email = get_signup_req()
        diff_email["email"] = "yui@hirasawa.moe"

        self.client.post(reverse_lazy("users_signup"), diff_email)
        res = self.client.post(reverse_lazy("users_signup"), diff_email)

        self.assertEqual(res.status_code, HTTPStatus.BAD_REQUEST)

        res_json = json.loads(res.content)
        self.assertTrue(res_json["email"])  # make sure the error exists
