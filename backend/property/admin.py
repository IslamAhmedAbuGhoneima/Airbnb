from django.contrib import admin
from .models import Category, Property, Reservation
# Register your models here.


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['title']
    list_filter = ['title']
    search_fields = ['title']

@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ['landlord', 'title',
                    'country', 'category', 'price_per_night', 'guests']
    list_filter = ['landlord', 'title', 'price_per_night', 'guests']
    search_fields = ['title', 'price_per_night', 'guests']
    raw_id_fields = ['landlord']


@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    def property_name(self, obj):
        return obj.property.title

    list_display = ['created_by', 'property_name', 'start_date',
                    'end_date', 'number_of_nights', 'guests', 'price']
    list_filter = ['created_by', 'start_date', 'end_date', 'guests']
    search_fields = ['created_by', 'price_per_night', 'guests']
