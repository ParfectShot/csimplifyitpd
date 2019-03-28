from django.db import models


class User_Master(models.Model):
    username = models.CharField(max_length=40, default=False)
    contact_no = models.CharField(max_length=10)
    email = models.EmailField()
    password = models.CharField(max_length=25)
    department = models.CharField(max_length=25)
    status = models.IntegerField(null=True)
    industry_segment = models.CharField(max_length=50, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.IntegerField()
    updated_at = models.DateTimeField(auto_now=True)
    updated_by = models.IntegerField()