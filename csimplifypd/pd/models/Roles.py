from django.db import models


class Roles(models.Model):

    role_choice = (
        ('1', 'Sales Representative'),
        ('2', 'Sales head'),
        ('3', 'Engineer'),
        ('4', 'Engineering Head'),
        ('5', 'Business Development Representative'),
        ('6', 'Business Development Head'),
        ('7', 'Admin'),
        ('8', 'HR'),
        ('9', 'Consultant'),
        ('10', 'Business Head'),
        ('11', 'SCM'),
    )
    role_name = models.CharField(max_length=40, choices=role_choice)
    role_desc = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    created_by = models.IntegerField(null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    updated_by = models.IntegerField(null=True)
