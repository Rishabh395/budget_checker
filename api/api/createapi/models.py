from django.db import models

# Create your models here.

# creating users model

# user model 
class Company(models.Model):
    company_id=models.AutoField(primary_key=True)
    name= models.CharField(max_length=50)
    added_date=models.DateTimeField(auto_now=True)

    
    def __str__(self):
        return self.name


class Employee(models.Model):
    name=models.CharField(max_length=100)
    amount=models.IntegerField(max_length=50 , default=0)

    company=models.ForeignKey(Company, on_delete=models.CASCADE)
    
