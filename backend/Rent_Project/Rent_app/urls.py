from rest_framework import routers
from Rent_app import views

router = routers.SimpleRouter()

router.register('users', views.UserViewSet, basename='users')
router.register('properties', views.PropertyViewset, basename='properties')
router.register('my-properties', views.PropertyLandlordViewset, basename='my-properties')
router.register('favorites', views.FavoriteViewset, basename='favorites')
router.register('rental-requests', views.RentalRequestViewset,
                basename='rental-requests')
router.register('properties-image', views.PropertyImageViewset,
                basename='properties-images')


urlpatterns = router.urls