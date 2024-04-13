from django.db import models
from django.conf import settings
from useraccount.models import User
import uuid
# Create your models here.


class Category(models.Model):
    uuid = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=250)
    icon = models.ImageField(upload_to='icons')

    class Meta:
        verbose_name = 'category'
        verbose_name_plural = 'Categories'

    def icon_url(self):
        return f"{settings.WEBSITE_URL}{self.icon.url}"

    def __str__(self):
        return f"{self.title}"


class Property(models.Model):
    uuid = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    landlord = models.ForeignKey(
        User, related_name='properties', on_delete=models.CASCADE)
    category = models.ForeignKey(
        Category, related_name='properties', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    favorited = models.ManyToManyField(
        User, related_name='favorites', blank=True)
    image = models.ImageField(upload_to='properties/images')
    price_per_night = models.DecimalField(max_digits=7, decimal_places=2)
    bedrooms = models.IntegerField()
    bathrooms = models.IntegerField()
    guests = models.IntegerField()
    country = models.CharField(max_length=255)
    country_code = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'property'
        verbose_name_plural = 'properties'
        indexes = [
            models.Index(fields=["uuid", "created_at"]),
        ]

    def image_url(self):
        return f"{settings.WEBSITE_URL}{self.image.url}"

    def __str__(self):
        return f"Hosted by {self.landlord.username}"


class Reservation(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    property = models.ForeignKey(
        Property, related_name='reservations', on_delete=models.CASCADE)
    created_by = models.ForeignKey(
        User, related_name='reservations', on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    number_of_nights = models.IntegerField()
    guests = models.IntegerField()
    price = models.DecimalField(max_digits=7, decimal_places=2)
    paid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=["id", "created_at"]),
        ]

    def __str__(self):
        return f"{self.created_by.username} reseve the property {self.property.title}"
