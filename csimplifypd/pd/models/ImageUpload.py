from django.db import models
from django.conf import settings
import os
from django.contrib.auth.models import User


def update_filename(instance, filename):
    path = "documents/"
    format = "test.jpg"
    return os.path.join(path, format)


class Img(models.Model):
    title = models.CharField(max_length=50, blank=True)
    image = models.ImageField(upload_to=update_filename)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.title