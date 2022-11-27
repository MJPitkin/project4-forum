from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    def validate(self, data):
        password = data.pop('password')
        data['password'] = make_password(password)
        return data
        # hashes the password

    class Meta:
        model = User
        fields = ('id','username', 'email', 'password', 'is_staff')