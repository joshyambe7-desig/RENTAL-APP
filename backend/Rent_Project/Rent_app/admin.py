from django.contrib import admin
from .models import Property, PropertyImage, Favorite, RentalRequest


class PropertyModel(admin.ModelAdmin):
    list_display = (
        'id', 'title',
        'price', 'address',
        'rooms', 'bathrooms',
        'surface', 'has_wifi',
        'created_at', 'updated_at',
        'is_furnished', 'landlord',
        'google_maps_link', 'category')


admin.site.register(Property, PropertyModel)


class ImageModel(admin.ModelAdmin):
    list_display = ("image", "property")


admin.site.register(PropertyImage, ImageModel)


class FavoriteModel(admin.ModelAdmin):
    list_display = ("tenant", "property", "created_at")


admin.site.register(Favorite, FavoriteModel)


class RentalRequestModel(admin.ModelAdmin):
    list_display = ("tenant", "property", "status", "message", "created_at")


admin.site.register(RentalRequest, RentalRequestModel)