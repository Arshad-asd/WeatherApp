
from rest_framework import serializers
from .models import UserAccount
from .helpers import validate_password,validate_field
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ('id', 'email', 'first_name', 'last_name', 'password', 'role','is_active')
        extra_kwargs = {'password': {'write_only': True}}
    
    def validate_username(self, value):
        validate_field(value)
        return value

    def validate_username(self, value):
        validate_field(value)
        return value

    def validate_password(self, value):
        validate_password(value)
        return value


    def create(self, validated_data):
        user = UserAccount.objects.create_user(**validated_data)
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role'] = user.role 
        return token
