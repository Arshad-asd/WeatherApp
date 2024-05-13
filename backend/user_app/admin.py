from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import UserAccount

class CustomUserAdmin(UserAdmin):
    list_display = ('id', 'email', 'is_active', 'role','is_superuser')
    search_fields = ('email', 'role')
    
    # Specify a valid field for ordering, for example, 'id'
    ordering = ('id',)

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name' ,'role')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    )

admin.site.register(UserAccount, CustomUserAdmin)