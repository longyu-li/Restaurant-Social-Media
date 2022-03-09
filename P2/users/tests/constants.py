from django.core.files.uploadedfile import SimpleUploadedFile

with open("users/tests/72467059_p0.png", "rb") as avatar_img:
    avatar = SimpleUploadedFile("avatar.png", avatar_img.read())

signup_req = {
    "first_name": "Mio",
    "last_name": "Akiyama",
    "email": "mio@akym.moe",
    "phone_num": "000-000-0000",
    "password1": "12345^ABCDE",
    "password2": "12345^ABCDE",
    "avatar": avatar,
}
