from django import template
from pd.models.UserRoleLink import User_role_link
from pd.models.Roles import Roles

register = template.Library()


@register.simple_tag()
def link(usr):
    roles = User_role_link.objects.filter(user_id=usr)
    role_string = ''
    for role in roles:
        role_obj = Roles.objects.get(id=role.role_id)
        if role_string == '':
            role_string = role_obj.role_name
        else:
            role_string += ", " + role_obj.role_name

    return role_string
