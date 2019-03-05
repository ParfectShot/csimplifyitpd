from django.shortcuts import render,redirect
from pd.control.ocr import getTextFromImage
from pd.models.ImageUpload import Img



# Create your views here.
def fileget(request):
    if request.method == 'GET':
        
        data = Img.objects.all()
        text = []
        for i in range(1,data.count()+1):
            testobject = Img.objects.get(id=i)
            testimage = testobject.image
            text.append(getTextFromImage(testimage))

        return render(request, 'pd/DetectedText.html', {
            'text': text,
            "data": data,
        })
    return render(request, "pd/DetectedText.html")

def delete(request, pk):
    if request.method == 'POST':
        book = Img.objects.get(pk=pk)
        book.delete()
    return redirect('fileupload')