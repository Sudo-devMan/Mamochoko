
from django.contrib import admin
from .models import CustomUser

class CustomUserAdmin(admin.ModelAdmin):
	list_display = ['username', 'email', 'phone', 'first_name', 'last_name', 'role']

admin.site.register(CustomUser, CustomUserAdmin)

