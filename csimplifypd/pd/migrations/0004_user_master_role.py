# Generated by Django 2.1.5 on 2019-03-19 05:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pd', '0003_auto_20190319_1059'),
    ]

    operations = [
        migrations.AddField(
            model_name='user_master',
            name='role',
            field=models.IntegerField(null=True),
        ),
    ]
