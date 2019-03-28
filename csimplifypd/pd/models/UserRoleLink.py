from django.db import models


class User_role_link(models.Model):
    user_id = models.IntegerField()
    role_id = models.IntegerField()
