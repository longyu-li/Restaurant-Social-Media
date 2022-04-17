import subprocess as sp
import os, sys, re, shutil
from random import random

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

from restaurants.models import Restaurant, Image, MenuItem
from users import models

# with open("live_linus_reaction.png", "rb") as file:
#     image_data = file.read()

# avatar = SimpleUploadedFile("avatar.png", image_data)

with open("data/data.csv") as file:
    data = file.read()

straunts = []
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
        domain = re.findall('(?:\w+\.)+\w+$', site)[0]
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

    user = models.RestifyUser.objects.create_user(
        f"owner@{domain}",
        f"owner@{domain}",
        "mypassword"
    )

    user.first_name = "owner"
    user.last_name = "owner"
    user.avatar = images[6 % len(images)]
    user.phone_num = "222-222-2222"

    user.save()

    rest = Restaurant.objects.create(
        user=user, name=realname,
        logo=images[0],
        phone_num=phonenum,
        address=addr,
        banner=images[1],
        description=desc
    )

    for i, img in enumerate(images):
        Image.objects.create(
            restaurant=rest,
            image=img,
            description=f"Image #{i}"
        )

    for i, item in enumerate(menu):
        MenuItem.objects.create(
            name=item,
            restaurant=rest,
            description="...",
            price=random()*30 + 5,
            image=menu_images[i],
        )
