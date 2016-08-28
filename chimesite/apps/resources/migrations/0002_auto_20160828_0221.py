# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-08-28 02:21
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resources', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='specialty',
            name='organization',
        ),
        migrations.AddField(
            model_name='organization',
            name='services',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='Specialty',
        ),
    ]