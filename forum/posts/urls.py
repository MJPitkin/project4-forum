from django.urls import path
from . import views

urlpatterns = [
    path('boards/<int:board_id>/threads/<int:thread_id>/posts/', views.PostListCreate.as_view()),
    path('boards/<int:board_id>/threads/<int:thread_id>/posts/<int:pk>/', views.PostRetrieveUpdateDestroy.as_view())
]
