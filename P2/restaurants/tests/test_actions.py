from http import HTTPStatus

from django.urls import reverse_lazy

from shared.authed_test import AuthedAPITestCase
from shared.constants import get_signup_req, signin_req, get_restaurant_req


class RestaurantActionTests(AuthedAPITestCase):

    def setUp(self) -> None:

        acc1_res = self.client.post(reverse_lazy("users_signup"), get_signup_req())
        self.assertEqual(acc1_res.status_code, HTTPStatus.CREATED)

        acc2 = get_signup_req()
        acc2["first_name"] = "Yui"
        acc2["last_name"] = "Hirasawa"
        acc2["email"] = "yui@hrsw.moe"

        acc2_res = self.client.post(reverse_lazy("users_signup"), acc2)
        self.assertEqual(acc2_res.status_code, HTTPStatus.CREATED)

        self.login(signin_req)

        restaurant_res = self.client.post(reverse_lazy("edit_restaurant"), get_restaurant_req())
        self.assertEqual(restaurant_res.status_code, HTTPStatus.CREATED)

        # blog_res = self.client.post(reverse_lazy(""))

    def test_404(self):

        self.login({"email": "yui@hrsw.moe", "password": signin_req["password"]})

        kwargs = {"restaurant_id": 44}

        like_res = self.client.post(reverse_lazy("restaurants_like", kwargs=kwargs))
        self.assertEqual(like_res.status_code, HTTPStatus.NOT_FOUND)

        follow_res = self.client.post(reverse_lazy("restaurants_follow", kwargs=kwargs))
        self.assertEqual(follow_res.status_code, HTTPStatus.NOT_FOUND)

        # like blog test here

    def test_no_self(self):

        self.login(signin_req)

        kwargs = {"restaurant_id": 1}

        like_res = self.client.post(reverse_lazy("restaurants_like", kwargs=kwargs))
        self.assertEqual(like_res.status_code, HTTPStatus.BAD_REQUEST)

        follow_res = self.client.post(reverse_lazy("restaurants_follow", kwargs=kwargs))
        self.assertEqual(follow_res.status_code, HTTPStatus.BAD_REQUEST)

    def test_success(self):

        self.login({"email": "yui@hrsw.moe", "password": signin_req["password"]})

        kwargs = {"restaurant_id": 1}

        like_res = self.client.post(reverse_lazy("restaurants_like", kwargs=kwargs))
        self.assertEqual(like_res.status_code, HTTPStatus.OK)

        get_like = self.client.get(reverse_lazy("restaurants_like", kwargs=kwargs))
        self.assertEqual(get_like.status_code, HTTPStatus.OK)
        self.assertEqual(get_like.content.decode("utf-8"), "true")

        follow_res = self.client.post(reverse_lazy("restaurants_follow", kwargs=kwargs))
        self.assertEqual(follow_res.status_code, HTTPStatus.OK)

        get_follow = self.client.get(reverse_lazy("restaurants_follow", kwargs=kwargs))
        self.assertEqual(get_follow.status_code, HTTPStatus.OK)
        self.assertEqual(get_follow.content.decode("utf-8"), "true")
