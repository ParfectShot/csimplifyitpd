from django import forms
from pd.models.UserCreationForm import User_Master


class UserForm(forms.ModelForm):
    class Meta:
        model = User_Master
        widgets = {
            'password': forms.PasswordInput(),
        }
    
