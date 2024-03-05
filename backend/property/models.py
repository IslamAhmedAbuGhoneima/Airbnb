from django.db import models
from django.conf import settings
from useraccount.models import User
import uuid
# Create your models here.


class Property(models.Model):
    uuid = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    landlord = models.ForeignKey(
        User, related_name='properties', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='properties/images')
    price_per_night = models.DecimalField(max_digits=5, decimal_places=2)
    bedrooms = models.IntegerField()
    bathrooms = models.IntegerField()
    guests = models.IntegerField()
    country = models.CharField(max_length=255)
    country_code = models.CharField(max_length=10)
    category = models.CharField(max_length=255)
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
