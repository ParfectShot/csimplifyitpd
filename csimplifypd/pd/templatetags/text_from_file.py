from django import template

register = template.Library()


@register.simple_tag()
def text_from_file(file_location):
    try:
        print(file_location)
        with open(file_location,'r+') as file:
            text = file.read()
            return text
    except:
        return 'No Text File'
    
    
