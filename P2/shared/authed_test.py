import json
from http import HTTPStatus

from django.urls import reverse_lazy
from rest_framework.test import APITestCase


class AuthedAPITestCase(APITestCase):
    def login(self, req):

        res = self.client.post(reverse_lazy("users_signin"), req)

        self.assertEqual(res.status_code, HTTPStatus.OK)

        tokens = json.loads(res.content)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {tokens['access']}")
