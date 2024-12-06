from .models import Employe
from rest_framework import serializers
from django.contrib.auth.models import User

class EmploySerializer(serializers.ModelSerializer):
    user=serializers.CharField(read_only=True)

    class Meta:
        model = Employe
        fields = "__all__"
    def create(self,validated_data):
        user=self.context.get("user")
        return Employe.objects.create(user=user,**validated_data)


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=["username","email","password"]
    def create(self,validated_data):
             return User.objects.create_user(**validated_data)