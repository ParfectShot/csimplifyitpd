from django.urls import path, include
from django.conf import settings
from django.contrib.auth import views
from pd.views import FileUpload, GetText, signup

urlpatterns = [
    path('fileupload/', FileUpload.fileup, name='fileupload'),
    path('detected/', GetText.fileget, name='detected'),
    # path('detected/<int:id>', GetText.delete, name ='delete'),
    path('signup/', signup.createuser, name='signup'),
    path('', views.LoginView.as_view(), name='login'),
    path('accounts/', include('django.contrib.auth.urls')),
]