
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Note

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'phone', 'password', 'role', 'picture']
        extra_kwargs = {
            "password": {
                "write_only": True
            }
        }
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class PublicUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'phone', 'role', 'picture']
        read_only_fields = ['role']

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'title', 'content', 'created', 'author']
        extra_kwargs = {
            "author": {
                "read_only": True
            }
        }
