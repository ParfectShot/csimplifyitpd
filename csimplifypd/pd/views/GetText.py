from django.shortcuts import render, redirect, get_object_or_404
from pd.control.ocr import getTextFromImage
from pd.models.ImageUpload import Img


# Create your views here.
def fileget(request):
    if request.method == 'GET':
        print(request.user.id)
        data = Img.objects.filter(user=request.user.id)
        print(data)
        context={
            'data': data,
        }

        # text = []
        # for i in range(1,data.count()+1):
        #     testobject = Img.objects.get(id=i)
        #     testimage = testobject.image
        #     text.append(getTextFromImage(testimage))

        return render(request, 'pd/DetectedText.html', context )
    return render(request, "pd/DetectedText.html")


# def delete(request, id):
#     if request.method == 'POST':
#         image = Img.objects.get(id=id)
#         image.delete()
#     return redirect('detected')