import django_filters 
from .models import Property


class PropertyFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(
        field_name='price',
        lookup_expr='gte'
    )
    max_price = django_filters.NumberFilter(
        field_name='price',
        lookup_expr='lte'
    )

    wifi = django_filters.BooleanFilter(
        field_name='has_wifi'
    )
    is_furnished = django_filters.BooleanFilter(
        field_name='is_furnished'
    )
    max_bathrooms = django_filters.NumberFilter(
        field_name='bathrooms',
        lookup_expr='lte'
    )
    min_bathrooms = django_filters.NumberFilter(
        field_name='bathrooms',
        lookup_expr='gte'
    )
    max_rooms = django_filters.NumberFilter(
            field_name='rooms',
            lookup_expr='lte'
        )
    min_rooms = django_filters.NumberFilter(
            field_name='rooms',
            lookup_expr='gte'
        )
    max_surface = django_filters.NumberFilter(
            field_name='surface',
            lookup_expr='lte'
        )
    min_surface = django_filters.NumberFilter(
            field_name='surface',
            lookup_expr='gte'
        )
    category = django_filters.ChoiceFilter(
        field_name='category',
        choices=Property.Category.choices
    )

