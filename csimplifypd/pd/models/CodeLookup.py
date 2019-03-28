from django.db import models


class Code_lookup(models.Model):
    lookup_code = models.CharField(max_length=50)
    key_code = models.IntegerField()
    description = models.CharField(max_length=500)
    key_1 = models.CharField(max_length=50)

    created_at = models.DateTimeField(auto_now_add=True, null=True)
    created_by = models.IntegerField(null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    updated_by = models.IntegerField(null=True)
