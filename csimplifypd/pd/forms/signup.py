from crispy_forms.helper import FormHelper
from django import forms
from crispy_forms.layout import Submit
import unicodedata
from django.contrib.auth.models import User
from django.utils.translation import gettext, gettext_lazy as _


class SignUpForm(forms.Form):

    Username = forms.CharField(required=True)
    Password = forms.CharField(widget=forms.PasswordInput, required=True)
    Confirm_Password = forms.CharField(
        widget=forms.PasswordInput, required=True)

    def __init__(self, *args, **kwargs):
        super(SignUpForm, self).__init__(*args)
        self.helper = FormHelper()
        self.helper.method = 'POST'
        self.helper.add_input(
            Submit('gobtn', 'Create User Account', css_class='btn-success'))

    def clean(self):
        cleaned_data = super(SignUpForm, self).clean()
        password = cleaned_data.get('Password')
        password_confirm = cleaned_data.get('Confirm_password')
        if password and password_confirm and password != password_confirm:
            raise forms.ValidationError("The two password fields must match.")
        return cleaned_data
