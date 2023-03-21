from django.urls import path
from . import views

urlpatterns = [
path('boards/', views.BoardListCreate.as_view()),
path('boards/<int:pk>/', views.BoardRetrieveUpdateDestroy.as_view())
]