import copy

from django.core.files.uploadedfile import SimpleUploadedFile

signup_req = {
    "first_name": "Mio",
    "last_name": "Akiyama",
    "email": "mio@akym.moe",
    "phone_num": "000-000-0000",
    "password1": "12345^ABCDE",
    "password2": "12345^ABCDE",
}

signin_req = {
    "email": signup_req["email"],
    "password": signup_req["password2"],
}


def get_signup_req():

    req = copy.deepcopy(signup_req)

    with open("shared/assets/72467059_p0.png", "rb") as avatar_img:
        # apparently this is consumed after use so it has to be created every time
        req["avatar"] = SimpleUploadedFile("avatar.png", avatar_img.read())

    return req


restaurant_req = {
    "name": "Mugi's Bakery",
    "address": "555 tomato, toyosato, kyoto",
    # "postal_code": "aaa_aaa",
    "phone_num": "000-000-0000",
    "description": "A bakery.",
}


def get_restaurant_req():

    req = copy.deepcopy(restaurant_req)

    with open("shared/assets/cake.png", "rb") as banner_img, open(
        "shared/assets/htt_logo.png", "rb"
    ) as logo_img:

        req["logo"] = SimpleUploadedFile("logo.png", logo_img.read())
        req["banner"] = SimpleUploadedFile("banner.png", banner_img.read())

    return req


blog_req = {"title": "Closing early", "content": "Closing early on Friday"}
