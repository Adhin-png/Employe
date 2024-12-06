from   django.shortcuts import render
from .models import Employe
from .serializers import EmploySerializer
from rest_framework.viewsets import ModelViewSet
from employeapp.serializers import EmploySerializer,UserRegisterSerializer
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import authentication,permissions
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
# Create your views here.


class UserProfileView(APIView):
    authentication_classes=[authentication.TokenAuthentication]
    permission_classes=[permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        data = {
            "username": user.username,
            "email": user.email,
        }
        return Response(data=data)

class ChangePasswordView(APIView):
    authentication_classes=[authentication.TokenAuthentication]
    permission_classes=[permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        old_password = request.data.get("old_password")
        new_password = request.data.get("new_password")

        if user.check_password(old_password):
            user.set_password(new_password)
            user.save()
            return Response({"message": "Password changed successfully"}, status=status.HTTP_200_OK)
        return Response({"error": "Old password is incorrect"}, status=status.HTTP_400_BAD_REQUEST)







class UserRegisterView(ViewSet):
    def create(self,request,*args,**kwargs):
        serializer=UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data)
        else:
            return Response(data=serializer.errors)
        
      




class EmployeView(ModelViewSet):
    authentication_classes=[authentication.TokenAuthentication]
    permission_classes=[permissions.IsAuthenticated]
    serializer_class = EmploySerializer
    queryset = Employe.objects.all()

    def create(self,request,*args,**kwargs):
            serializer = EmploySerializer(data=request.data,context={"user":request.user})
            if serializer.is_valid():
                 serializer.save()
                 return Response(data=serializer.data)
            else:
                 return Response(data=serializer.errors)