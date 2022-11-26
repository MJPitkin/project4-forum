from django.urls import path
from . import views

urlpatterns = [
    path('boards/<int:board_id>/threads/', views.ThreadListCreate.as_view()),
    path('boards/<int:board_id>/threads/<int:pk>/',
         views.ThreadRetrieveUpdateDestroy.as_view())
]
