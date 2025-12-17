
from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.CreateUserView.as_view(), name='register'),
    path('notes/', views.NoteListCreate.as_view(), name='notes'),
    path('notes/<int:pk>/', views.NoteDelete.as_view(), name='note-detail'),
    path('users/', views.UserList.as_view(), name='users'),
    path('users/<int:pk>/', views.UserDetail.as_view(), name='user-detail')
]
