from django.shortcuts import render,redirect
from pd.control.ocr import getTextFromImage
from pd.models.ImageUpload import Img



# Create your views here.
def fileget(request):
    if request.method == 'GET':
        text = getTextFromImage('media/documents/test.jpg')

        return render(request, 'pd/DetectedText.html', {
            'text': text,
        })
    return render(request, "pd/DetectedText.html")

def delete(request, pk):
    if request.method == 'POST':
        book = Img.objects.get(pk=pk)
        book.delete()
    return redirect('fileupload')