from django.urls import path, include
from django.conf import settings
from pd.views import fileupload, gettext, signup
from django.contrib.auth import views

urlpatterns = [
    path('fileupload/', fileupload.fileup, name='fileupload'),
    path('detected/', gettext.fileget, name='detected'),
    path('signup/', signup.createuser, name='signup'),
    path('', views.LoginView.as_view(), name='login'),
    path('accounts/', include('django.contrib.auth.urls')),
]