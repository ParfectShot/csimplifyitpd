# from django import template
from PIL import Image
import pytesseract
from wand.image import Image as Img
import nltk
from nltk.tokenize import word_tokenize
from nltk.tag import pos_tag

# register = template.Library()


# @register.simple_tag()
def get_text(img):
    # img = "media/" + img
    # print(img)
    img = img.lstrip("/")
    text = pytesseract.image_to_string(img, lang='eng')
    text_filename = img.rstrip('.jpg')
    with open(text_filename+".txt",'w+') as file:
        file.write(text)
    # return text