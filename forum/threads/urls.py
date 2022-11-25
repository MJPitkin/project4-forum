from django.urls import path
from . import views

urlpatterns = [
    path('threads/', views.ThreadListCreate.as_view()),
    path('threads/<int:pk>/', views.ThreadRetrieveUpdateDestroy.as_view())
]
