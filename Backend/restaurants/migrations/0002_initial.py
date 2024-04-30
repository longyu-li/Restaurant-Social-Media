# Generated by Django 4.0.3 on 2022-03-16 03:23

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("restaurants", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="restaurant",
            name="follows",
            field=models.ManyToManyField(
                related_name="followed_restaurants", to=settings.AUTH_USER_MODEL
            ),
        ),
        migrations.AddField(
            model_name="restaurant",
            name="likes",
            field=models.ManyToManyField(
                related_name="liked_restaurants", to=settings.AUTH_USER_MODEL
            ),
        ),
        migrations.AddField(
            model_name="restaurant",
            name="user",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="restaurant",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="menuitem",
            name="restaurant",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="restaurants.restaurant"
            ),
        ),
        migrations.AddField(
            model_name="image",
            name="restaurant",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="restaurants.restaurant"
            ),
        ),
        migrations.AddField(
            model_name="comment",
            name="owner",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL
            ),
        ),
        migrations.AddField(
            model_name="comment",
            name="restaurant",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="restaurants.restaurant"
            ),
        ),
        migrations.AddField(
            model_name="blog",
            name="likes",
            field=models.ManyToManyField(
                related_name="liked_blogs", to=settings.AUTH_USER_MODEL
            ),
        ),
        migrations.AddField(
            model_name="blog",
            name="restaurant",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="restaurants.restaurant"
            ),
        ),
    ]