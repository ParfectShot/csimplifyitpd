from django.contrib import admin
from pd.models import ImageUpload, UserCreationForm, CodeLookup, Roles, UserRoleLink
# Register your models here.
admin.site.register(ImageUpload.Img)
admin.site.register(UserCreationForm.User_Master)
admin.site.register(CodeLookup.Code_lookup)
admin.site.register(Roles.Roles)
admin.site.register(UserRoleLink.User_role_link)
