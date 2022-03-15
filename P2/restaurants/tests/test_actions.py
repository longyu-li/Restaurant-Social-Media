from http import HTTPStatus

from django.urls import reverse_lazy

from shared.authed_test import AuthedAPITestCase
from shared.constants import get_signup_req, signin_req, get_restaurant_req


class RestaurantActionTests(AuthedAPITestCase):

    def setUp(self) -> None:

        acc1_res = self.client.post(reverse_lazy("users_signup"), get_signup_req())
        self.assertEqual(acc1_res.status_code, HTTPStatus.OK)

        acc2 = get_signup_req()
        acc2["first_name"] = "Yui"
        acc2["last_name"] = "Hirasawa"
        acc2["email"] = "yui@hrsw.moe"

        acc2_res = self.client.post(reverse_lazy("users_signup"), acc2)
        self.assertEqual(acc2_res.status_code, HTTPStatus.OK)

        self.login(signin_req)

        restaurant_res = self.client.post(reverse_lazy("edit_restaurant"), get_restaurant_req())
        self.assertEqual(restaurant_res.status_code, HTTPStatus.OK)

        # blog_res = self.client.post(reverse_lazy(""))




