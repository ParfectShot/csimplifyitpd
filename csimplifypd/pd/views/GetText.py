from django.shortcuts import render, redirect
from pd.control.ocr import getTextFromImage
from pd.models.ImageUpload import Img


# Create your views here.
def fileget(request):
    if request.method == 'GET':

        image_obj = Img.objects.filter(user_id=request.user.id)
        print(image_obj)

        text = {}
        image_list = Img.objects.filter(user_id=request.user.id).values_list(
            'image', flat=True)
        print(image_list)
        for i in range(0, len(image_list)):
            print(image_list[i])
            text[image_list[i]] = getTextFromImage(image_list[i])
            i = 0
        print(text)
        return render(request, 'pd/DetectedText.html', {
            "text": text,
            "image_obj": image_obj,
        })
    return render(request, "pd/DetectedText.html")


def delete(request, pk):
    if request.method == 'POST':
        book = Img.objects.get(pk=pk)
        book.delete()
    return redirect('fileupload')