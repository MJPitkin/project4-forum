# Generated by Django 4.1.3 on 2022-11-19 10:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('threads', '0001_initial'),
        ('boards', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='board',
            name='threads',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='threads.thread'),
        ),
    ]
