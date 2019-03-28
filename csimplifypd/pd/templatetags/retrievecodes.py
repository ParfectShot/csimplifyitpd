from django import template
from pd.models.CodeLookup import Code_lookup

register = template.Library()


@register.simple_tag()
def retrievecodes(value,lookupcode):
    print(value,lookupcode)
    code = Code_lookup.objects.get(lookup_code=lookupcode,key_code=value)
    print(code.key_1)
    return code.key_1

