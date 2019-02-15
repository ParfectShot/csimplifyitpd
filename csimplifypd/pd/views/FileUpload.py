from pd.forms.fileuploadform import DocumentForm
from django.shortcuts import render, redirect
from django.conf import settings
from django.core.files.storage import FileSystemStorage

def fileup(request):
    if request.method == 'POST':
        form = DocumentForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect("detected")

    else:
        form = DocumentForm()
    return render(request, 'pd/FileUpload.html', {'form': form})
