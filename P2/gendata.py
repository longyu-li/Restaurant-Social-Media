import subprocess as sp
import os, sys, re, shutil
from random import choice, random, randint, choices
from typing import Tuple

from faker import Faker

from lorem.text import TextLorem

fake = Faker()

# def fake_name() -> Tuple[str, str]:
#     while name := fake.name():
#         spl = name.split(' ')
#         if len(spl) != 2:
#             continue

#         return spl

def fake_phonenum() -> str:
    n = [randint(0,9) for _ in range(10)]
    return f"{min(n[0]+1,9)}{n[1]}{n[2]}-{n[3]}{n[4]}{n[5]}-{n[6]}{n[7]}{n[8]}{n[9]}"

lorem = TextLorem(srange=(8, 14), prange=(4, 7), trange=(1,3))

# shutil.rmtree('media')

# try:
#     os.remove("db.sqlite3")
# except Exception as e:
#     print(e)

# proc = sp.Popen(["manage.py", "migrate"], shell=True, stdout=sp.PIPE)
# proc.wait()

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "phase2.settings")

import django
django.setup()

from django.core.files.uploadedfile import SimpleUploadedFile

from rest_framework.test import APIClient

from notifications.models import Blog as NBlog, Like as NLike, Comment as NComment, Follow as NFollow, Menu as NMenu
from restaurants.models import Restaurant, Image, MenuItem, Blog, Comment, Tag
from users import models as usermodels

with open("live_linus_reaction.png", 'rb') as file:
    av_data = file.read()

avatar = SimpleUploadedFile("avatar.png", av_data)

logins = open("logins.txt", 'w')

users = []
for _ in range(15):
    while 1:
        email = fake.email()
        try:
            user = usermodels.RestifyUser.objects.create_user(
                email,
                email,
                "mypassword"
            )
        except django.db.utils.IntegrityError:
            continue
        break

    user.first_name = fake.first_name()
    user.last_name = fake.last_name()
    user.avatar = avatar
    user.phone_num = fake_phonenum()

    user.save()

    print(f"Create user '{user.first_name}.{user.last_name}' with email [{user.email}]")

    logins.write(f"Regular user [{user.first_name}.{user.last_name}] with email [{user.email}] and password [mypassword]\n")

    users.append(user)

tagdata = {
    "Abu_Hummus": "shwarma,middle eastern,middle-eastern,vegetarian",
    "Holy_Cow_Japanese_Steakhouse": "steak,japanese",
    "KINKA_IZAKAYA_ORIGINAL": "japanese",
    "King_Taps": "beer,pub,comfort food",
    "Nodo_Restaurant": "italian,pizza,pasta",
    "Sabai_Sabai_Kitchen_and_Bar": "indian,curry,naan",
    "Three_Monks_and_a_Duck": "vegan,vegetarian,brunch,asian",
    "The_Oxley": "british,roast,cheap"
}

with open("data/data.csv") as file:
    data = file.read()

straunts = []
mitems = {}
for line in data.split('\n'):
    name, site, phonenum, addr, *descmenu = line.split(",")
    if "#" in descmenu[-1]:
        menu = descmenu[-1].split("#")
        desc = ','.join(descmenu[:1])
    else:
        desc = ','.join(descmenu)
        menu = []

    site = site.removesuffix('/')

    realname = name.replace('_', ' ')

    phonenum = '-'.join(re.findall('\d+', phonenum))

    addr = addr.replace('#', '')

    print(name, site, phonenum, addr, desc, menu)

    try:
        domain: str = re.findall('(?:\w+\.)+\w+', site)[0]
        domain = domain.removeprefix("www.")
    except:
        print("no match:", site)
        raise

    images = []
    menu_images = []

    for fname in os.listdir(f'data/images/{name}'):
        if fname.endswith('.jpg'):
            with open(f'data/images/{name}/{fname}', 'rb') as imgfile:
                imgdata = imgfile.read()
            uploaded = SimpleUploadedFile(fname, imgdata)
            if re.match("^\d+", fname):
                images.append(uploaded)
            else:
                menu_images.append(uploaded)

    print(f"owner@{domain}")
    user = usermodels.RestifyUser.objects.create_user(
        f"owner@{domain}",
        f"owner@{domain}",
        "mypassword"
    )

    user.first_name = fake.first_name()
    user.last_name = fake.last_name()
    user.avatar = images[6 % len(images)]
    user.phone_num = fake_phonenum()

    user.save()

    logins.write(f"restaurant owner [{user.first_name} {user.last_name}] with email [{user.email}] and password [mypassword]\n")

    rest = Restaurant.objects.create(
        user=user, name=realname,
        logo=images[0],
        phone_num=phonenum,
        address=addr,
        banner=images[1],
        description=desc
    )

    if name in tagdata:
        for tag in tagdata[name].split(','):
            Tag.objects.create(
                restaurant=rest,
                tag=tag
            )

    for i, img in enumerate(images):
        Image.objects.create(
            restaurant=rest,
            image=img,
            title=f"Image #{i}",
            description=lorem.sentence()
        )

    mitems_ = []
    for i, item in enumerate(menu):
        mitem = MenuItem.objects.create(
            name=item.replace('_', ' '),
            restaurant=rest,
            description=lorem.sentence(),
            price=random()*30 + 5,
            image=menu_images[i],
        )
        mitems_.append(mitem)

    straunts.append(rest)
    mitems[rest.id] = mitems_

for straunt in straunts:
    for user in choices(users, k=randint(1,13)):
        straunt.likes.add(user)
        NLike.objects.create(
            user=user,
            owner=straunt.user,
            kind=NLike.Kind.Restaurant
        )

    followers = choices(users, k=randint(1,13))
    for user in followers:
        straunt.follows.add(user)

    blogs = []
    for _ in range(randint(2, 6)):
        blog = Blog.objects.create(
            title=lorem.sentence(),
            content=lorem.text(),
            restaurant=straunt
        )

        for follower in followers:
            NBlog.objects.create(
                blog=blog,
                restaurant=straunt,
                owner=follower
            )

            if random() > 0.5:
                blog.likes.add(follower)

                NLike.objects.create(
                    user=follower,
                    owner=straunt.user,
                    kind=NLike.Kind.Post
                )

    for user in followers:
        if random() > 0.3:
            comm = Comment.objects.create(
                owner=user,
                restaurant=straunt,
                content=lorem.paragraph()
            )
            NComment.objects.create(
                comment=comm,
                user=user,
                owner=straunt.user,
            )
        if len(mitems[straunt.id]) > 0:
            if random() > 0.7:
                mitem = choice(mitems[straunt.id])
                NMenu.objects.create(
                    change="c",
                    menu=mitem,
                    restaurant=straunt,
                    owner=user
                )

logins.close()