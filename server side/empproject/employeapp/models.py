from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class Employe(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    phone_number = models.CharField(max_length=10)
    address = models.CharField(max_length=100)
    dynamic_fields = models.JSONField(default=dict) 

    def __str__(self):
        return self.name