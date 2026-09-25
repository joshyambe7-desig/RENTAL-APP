from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator


class User(AbstractUser):
    class Role(models.TextChoices):
        LANDLORD = 'LANDLORD', 'LandLord'
        TENANT = 'TENANT', 'Tenant'
    role = models.CharField(
        max_length=30,
        choices=Role.choices)


class Property(models.Model):
    class Category(models.TextChoices):
        APPARTEMENT = 'APPARTEMENT', 'Appartement'
        STUDIO = 'STUDIO', 'Studio'
        HOUSE = 'HOUSE', 'house'
        DUPLEX = 'DUPLEX', 'Duplex'

    title = models.CharField(max_length=255)
    description = models.TextField(max_length=1000, blank=True)
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(
            100,
            message="Le minimum pour le prix est 100DT")])
    address = models.CharField(max_length=255)
    rooms = models.IntegerField(
        validators=[MinValueValidator(0, message="Le minimum est 0 ")])
    bathrooms = models.IntegerField(
        validators=[MinValueValidator(
            1,
            message="La propriété doit au moins contenir une salle de bain ")])
    surface = models.DecimalField(
        max_digits=8,
        decimal_places=2,
        validators=[MinValueValidator(
            9.0,
            message="Le minimum est 9 m2 ")])
    has_wifi = models.BooleanField(default=False)
    is_furnished = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    landlord = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='properties',
        on_delete=models.CASCADE)
    google_maps_link = models.URLField(blank=True, null=True)
    category = models.CharField(max_length=30, choices=Category.choices)


class PropertyImage(models.Model):
    image = models.ImageField(
        upload_to='properties/'
    )
    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name="images")


class Favorite(models.Model):
    tenant = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='favorites')
    
    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name='favorites'
        )
    created_at = models.DateTimeField(auto_now=True)


class RentalRequest(models.Model):
    class Status(models.TextChoices):
        PENDING = 'PENDING', 'Pending'
        ACCEPTED = 'ACCEPTED', 'Accepted'
        REJECTED = 'REJECTED', 'Rejected'

    tenant = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        related_name='rental_requests')
    property = models.ForeignKey(
        Property, 
        on_delete=models.CASCADE,
        related_name='rental_requests')
    message = models.CharField(max_length=255)
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["tenant", "property"],
                name="unique_tenant_property_favorite"
            )
        ]