# Generated by Django 4.1.3 on 2022-11-25 18:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_remove_customuser_is_admin_customuser_rating_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='CustomUser',
        ),
    ]