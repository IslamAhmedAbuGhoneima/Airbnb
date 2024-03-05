from django.contrib import admin
from .models import Property
# Register your models here.


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ['landlord', 'title',
                    'country', 'category', 'price_per_night', 'guests']
    list_filter = ['landlord', 'title', 'price_per_night', 'guests']
    search_fields = ['title', 'price_per_night', 'guests']
    raw_id_fields = ['landlord']
