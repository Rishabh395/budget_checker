from django.contrib import admin
from createapi.models import Company,Employee
# Register your models here..

class CompanyAdmin(admin.ModelAdmin):
    list_display=('company_id' , 'name')
    search_fields=('company_id',)   
    
class EmployeeAdmin(admin.ModelAdmin):
    list_display=('name','amount')
    list_filter=('company',)

admin.site.register(Company,CompanyAdmin)
admin.site.register(Employee,EmployeeAdmin)