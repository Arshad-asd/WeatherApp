# views.py

from rest_framework import generics
from rest_framework.permissions import AllowAny
from .serializers import *
from rest_framework_simplejwt.views import TokenObtainPairView ,TokenRefreshView
from rest_framework.permissions import IsAdminUser
from rest_framework.generics import UpdateAPIView
from rest_framework.response import Response
from rest_framework import status


class UserAccountRegistrationView(generics.CreateAPIView):
    serializer_class = UserAccountSerializer
    permission_classes = [AllowAny]

class UserLoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class UserListView(generics.ListAPIView):
    queryset = UserAccount.objects.exclude(role='admin')  
    serializer_class = UserAccountSerializer
    permission_classes = [IsAdminUser]


class BlockUnblockUserView(UpdateAPIView):
    serializer_class = UserAccountSerializer
    permission_classes = [IsAdminUser]


    def get_queryset(self):
        return UserAccount.objects.all()

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance:
            instance.is_active = not instance.is_active
            instance.save()

            serializer = self.get_serializer(instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)