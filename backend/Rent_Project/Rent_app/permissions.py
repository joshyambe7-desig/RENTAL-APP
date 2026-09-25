from rest_framework.permissions import BasePermission
from .models import User


class IsPropertyOwner(BasePermission):

    def has_object_permission(self, request, view, obj):
        return (request.user.is_staff
                or obj.landlord == request.user)


class IsUserHimself(BasePermission):
    def has_object_permission(self, request, view, obj):
        return (obj == request.user
                or request.user.is_staff)


class IsFavoriteSelectedUser(BasePermission):
    def has_object_permission(self, request, view, obj):
        return (
            request.user.is_staff
            or obj.tenant == request.user
        )

    def has_permission(self, request, view):
        return (request.user.is_authenticated)


class PropertyImageOwner(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):

        return (request.user.is_staff 
                or obj.property.landlord == request.user)


class IsLandLord (BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and
            (request.user.is_staff or
                request.user.role == User.Role.LANDLORD)
                )

    def has_object_permission(self, request, view, obj):
        return (
            request.user.is_staff
            or
            obj.landlord == request.user)


class CanViewRentalRequest(BasePermission):
    def has_object_permission(self, request, view, obj):
        return (
            request.user.is_staff
            or obj.tenant == request.user
            or obj.property.landlord == request.user
        )


class IsRentalRequestOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return (
            request.user.is_staff
            or obj.property.landlord == request.user
        )


class IsTenant(BasePermission):
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and request.user.role == User.Role.TENANT)