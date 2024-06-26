# Generated by Django 4.0.3 on 2022-03-16 03:23

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Blog",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=150)),
                ("content", models.TextField(max_length=280)),
                ("date", models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name="Comment",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("content", models.CharField(max_length=500)),
                ("date", models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name="Image",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("image", models.ImageField(upload_to="images/")),
                ("title", models.CharField(max_length=150)),
                ("description", models.TextField(max_length=280)),
            ],
        ),
        migrations.CreateModel(
            name="MenuItem",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=150)),
                ("description", models.TextField(max_length=280)),
                ("price", models.DecimalField(decimal_places=2, max_digits=6)),
                ("image", models.ImageField(upload_to="menu/")),
            ],
        ),
        migrations.CreateModel(
            name="Restaurant",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=150)),
                ("street", models.CharField(max_length=150)),
                ("city", models.CharField(max_length=150)),
                ("province", models.CharField(max_length=150)),
                ("postal_code", models.CharField(max_length=150)),
                ("logo", models.ImageField(upload_to="logos/")),
                (
                    "phone_num",
                    models.CharField(
                        max_length=12,
                        validators=[
                            django.core.validators.RegexValidator(
                                "[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            )
                        ],
                    ),
                ),
                ("banner", models.ImageField(upload_to="banners/")),
                ("description", models.TextField(max_length=280)),
            ],
        ),
        migrations.CreateModel(
            name="Tag",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("tag", models.CharField(max_length=50)),
                (
                    "restaurant",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="restaurants.restaurant",
                    ),
                ),
            ],
        ),
    ]
