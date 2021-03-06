from django import forms
from pd.models.ImageUpload import Img


class DocumentForm(forms.ModelForm):
    class Meta:
        model = Img
        fields = (
            'title',
            'image',
        )
