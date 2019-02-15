from django.db import models
import os


def update_filename(instance, filename):
    path = "documents/"
    format = "test.jpg"
    return os.path.join(path, format)


class Img(models.Model):
    title = models.CharField(max_length=50, blank=True)
    image = models.ImageField(upload_to=update_filename)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title