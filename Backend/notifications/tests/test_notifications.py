from http import HTTPStatus

from django.urls import reverse_lazy

from shared.authed_test import AuthedAPITestCase
from shared.constants import get_signup_req, signin_req, get_restaurant_req


class NotificationTests(AuthedAPITestCase):
    def setUp(self) -> None:
        self.acc1_login = signin_req
        self.acc2_login = {"email": "yui@hrsw.moe", "password": signin_req["password"]}

        acc1_res = self.client.post(reverse_lazy("users_signup"), get_signup_req())
        self.assertEqual(acc1_res.status_code, HTTPStatus.CREATED)
        self.acc1 = acc1_res.data

        acc2 = get_signup_req()
        acc2["first_name"] = "Yui"
        acc2["last_name"] = "Hirasawa"
        acc2["email"] = self.acc2_login["email"]

        acc2_res = self.client.post(reverse_lazy("users_signup"), acc2)
        self.assertEqual(acc2_res.status_code, HTTPStatus.CREATED)
        self.acc2 = acc2_res.data

        self.login(signin_req)

        self.restaurant_res = self.client.post(
            reverse_lazy("edit_restaurant"), get_restaurant_req()
        )
        self.assertEqual(self.restaurant_res.status_code, HTTPStatus.CREATED)

    def test_like_restaurant(self):
        # Login as user 1
        self.login(self.acc2_login)

        r_id = self.restaurant_res.json()["id"]

        kwargs = {"restaurant_id": r_id}

        res = self.client.post(reverse_lazy("restaurants_like", kwargs=kwargs))
        self.assertEqual(res.status_code, HTTPStatus.OK)

        self.login(self.acc1_login)
        res = self.client.get(reverse_lazy("notifications"))
        self.assertEqual(res.status_code, HTTPStatus.OK)

        self.assertEqual(len(res.data), 1)
        data = res.data[0]

        self.assertEqual(data["type"], "like")
        self.assertEqual(
            data["user"],
            {
                "id": self.acc2["id"],
                "first_name": self.acc2["first_name"],
                "last_name": self.acc2["last_name"],
            },
        )

    def test_many(self):
        # Login as user 1
        self.login(self.acc2_login)

        r_id = self.restaurant_res.json()["id"]

        kwargs = {"restaurant_id": r_id}

        res = self.client.post(reverse_lazy("restaurants_like", kwargs=kwargs))
        self.assertEqual(res.status_code, HTTPStatus.OK)

        res = self.client.post(reverse_lazy("restaurants_follow", kwargs=kwargs))
        self.assertEqual(res.status_code, HTTPStatus.OK)

        # TODO: liking a post, adding a comment

        self.login(self.acc1_login)
        res = self.client.get(reverse_lazy("notifications"))
        self.assertEqual(res.status_code, HTTPStatus.OK)

        self.assertEqual(len(res.data), 2)

        data = res.data[0]

        self.assertEqual(data["type"], "follow")
        self.assertEqual(
            data["user"],
            {
                "id": self.acc2["id"],
                "first_name": self.acc2["first_name"],
                "last_name": self.acc2["last_name"],
            },
        )

        data = res.data[1]

        self.assertEqual(data["type"], "like")
        self.assertEqual(
            data["user"],
            {
                "id": self.acc2["id"],
                "first_name": self.acc2["first_name"],
                "last_name": self.acc2["last_name"],
            },
        )
