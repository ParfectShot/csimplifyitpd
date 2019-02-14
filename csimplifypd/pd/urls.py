from django.urls import path, include
from django.conf import settings
from pd.views import FileUpload, GetText, SignUp
from django.contrib.auth import views

urlpatterns = [
    path('fileupload/', FileUpload.fileup, name='fileupload'),
    path('detected/', GetText.fileget, name='detected'),
    path('signup/', SignUp.createuser, name='signup'),
    path('', views.LoginView.as_view(), name='login'),
    path('accounts/', include('django.contrib.auth.urls')),
]