# Generated by Django 2.1.5 on 2019-03-25 12:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pd', '0006_auto_20190319_1721'),
    ]

    operations = [
        migrations.CreateModel(
            name='User_role_link',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.IntegerField()),
                ('role_id', models.IntegerField()),
            ],
        ),
        migrations.AlterField(
            model_name='user_master',
            name='status',
            field=models.IntegerField(null=True),
        ),
    ]