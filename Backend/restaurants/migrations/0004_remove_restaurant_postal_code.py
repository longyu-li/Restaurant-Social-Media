# Generated by Django 4.0.3 on 2022-04-10 17:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('restaurants', '0003_remove_restaurant_city_remove_restaurant_province_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='restaurant',
            name='postal_code',
        ),
    ]