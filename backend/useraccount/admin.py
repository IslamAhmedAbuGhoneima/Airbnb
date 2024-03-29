from django.contrib import admin
from .models import User
# Register your models here.


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['email', 'last_login', 'is_active']
    list_filter = ['email', 'is_active']
    search_fields = ['email', 'is_active']
    fieldsets = [
        (
            "Personal Details",
            {
                "fields": ['username', 'email', 'avatar', 'password',],
            }
        ),
        (
            'Groups and Permissions',
            {
                'fields': ('is_superuser', 'is_staff', 'is_active', 'groups', 'user_permissions')
            }
        )
    ]
