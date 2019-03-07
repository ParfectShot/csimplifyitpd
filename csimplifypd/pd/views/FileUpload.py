from django.shortcuts import render, redirect
from django.core.files.storage import FileSystemStorage
from pd.forms.FileUploadForm import DocumentForm
from pd.control.producer import send_message


def fileup(request):
    if request.method == 'POST':
        form = DocumentForm(request.POST, request.FILES)

        if form.is_valid():
            form = form.save(commit=False)
            form.user = request.user
            form.save()
            print(form.image)
            print(form.user_id)
            send_message(str(form.image), form.user_id)

            text_filename = 'media/' + str(form.image).rstrip('.jpg') + '.txt'
            form.text_file = text_filename
            print(str(form.text_file))
            form.save()
            with open(text_filename, 'r+') as file:
                new_text = file.read()

            return render(request, "pd/NewText.html", {
                'form': form,
                'new_text': new_text,
            })

    else:
        form = DocumentForm()
    return render(request, 'pd/FileUpload.html', {'form': form})
