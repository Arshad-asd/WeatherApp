from django.urls import path
from .views import *

urlpatterns = [
    path('user/register/', UserAccountRegistrationView.as_view(), name='register'),
    path('user/login/', UserLoginView.as_view(), name=';ogin'),
    path('admin/users-list/',UserListView.as_view(),name="users-list"),
    path('admin/block-unblock/<int:pk>/', BlockUnblockUserView.as_view(), name='block-unblock-user'),

]