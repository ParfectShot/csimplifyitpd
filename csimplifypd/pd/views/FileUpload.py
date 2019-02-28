from django.shortcuts import render, redirect
from django.core.files.storage import FileSystemStorage
from pd.forms.FileUploadForm import DocumentForm


def fileup(request):
    if request.method == 'POST':
        form = DocumentForm(request.POST, request.FILES)

        
 
        if form.is_valid():
            form = form.save(commit=False)
            form.user = request.user
            form.save()
            return redirect("detected")

    else:
        form = DocumentForm()
    return render(request, 'pd/process-designer.html', {'form': form})
