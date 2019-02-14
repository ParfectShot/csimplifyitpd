from PIL import Image
import pytesseract
from wand.image import Image as Img
import nltk
from nltk.tokenize import word_tokenize
from nltk.tag import pos_tag


def getTextFromImage(img):

    text = pytesseract.image_to_string(img, lang='eng')
    return text

    # with open('demo.txt', 'a+') as f:
    # f.write(text)

    # with open('demo.txt', 'r') as f:

    #     if 'Invoice No.' in f.read():
    #         print('yes')


# print(text)

# example = text

# def preprocess(sent):
#     sent = nltk.word_tokenize(sent)
#     sent = nltk.pos_tag(sent)
#     return sent

# sent = preprocess(example)
# print(sent)