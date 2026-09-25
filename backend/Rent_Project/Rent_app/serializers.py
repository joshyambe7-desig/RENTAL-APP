from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError
from django.db import models
from .models import User, Property, PropertyImage, Favorite, RentalRequest


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", 'username', 'email', 'role']
        read_only_fields = ['role']


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'role', 'password']
    # In this way the field password could just be write but we won't send it as response
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate_role(self, value):
        allowed_roles = [User.Role.TENANT, User.Role.LANDLORD]

        if value not in allowed_roles:
            raise serializers.ValidationError("You cannot put another role")
        return value

    def validate_password(self, value):
        try:
            validate_password(value)
        except DjangoValidationError as e:
            raise serializers.ValidationError(e.messages)
        return value

    def create(self, validated_data):
        # we delete the password from validated_data and we get it
        password = validated_data.pop('password')

        # we give automaticaly the  rest of the arguments
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        return user


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True, required=True)
    new_password = serializers.CharField(write_only=True, required=True)

    def validate_old_password(self, password):
        user = self.context['request'].user
        if not user.check_password(password):
            raise serializers.ValidationError("The old password is not valid")
        return password

    def validate_new_password(self, value):
        try:
            validate_password(password=value)
        except DjangoValidationError as e:
            raise serializers.ValidationError(e.messages)
        return value

    def save(self, **kwargs):
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user


class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ['id', 'image', 'property']

    def validate(self, attrs):
        property = attrs['property']
        user = self.context['request'].user

        if property.landlord != user:
            raise serializers.ValidationError(
                "You can only add images to your own properties."
            )

        return attrs


class PropertySerializer(serializers.ModelSerializer):
    images = PropertyImageSerializer(many=True, read_only=True)
    favorite_id = serializers.SerializerMethodField()

    class Meta:
        model = Property
        fields = [
            'id', 'title',
            'description', 'price', 'address', 'rooms',
            'bathrooms', 'surface', 'has_wifi', 'created_at',
            'updated_at', 'is_furnished', 'landlord',
            'google_maps_link',
            'category', 'images', 'favorite_id']
        read_only_fields = ['landlord', 'created_at', 'updated_at']

    def validate_category(self, value):
        allowed_categories = ["APPARTEMENT", "STUDIO", "HOUSE", "DUPLEX"]

        if value not in allowed_categories:
            raise serializers.ValidationError("You can not choose another category")
        return value

    # This function allow us to verify for each property if the user liked it
    def get_favorite_id(self, obj):
        request = self.context.get('request')
        if not request or not request.user.is_authenticated:
            return None
        return obj.favorites.filter(
            tenant=request.user
        ).values_list("id", flat=True).first()


class FavoriteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Favorite
        fields = ['id', 'tenant', 'property', 'created_at']
        read_only_fields = ['tenant', 'created_at']

    def validate_property(self, value):
        user = self.context['request'].user
        if Favorite.objects.filter(property=value, tenant=user).exists():
            raise serializers.ValidationError("You can not like the same property twice")
        return value
    constraints = [
        models.UniqueConstraint(
            fields=['tenant', 'property'], name='unique_favorite')
    ]


class RentalRequestSerializer(serializers.ModelSerializer):
    property = PropertySerializer(read_only=True) 
# we put property_id cause we should know the id of the proerty we would like
    property_id = serializers.PrimaryKeyRelatedField(
        queryset=Property.objects.all(), source='property', write_only=True
    )

    class Meta:
        model = RentalRequest
        fields = [
            'id', 'tenant',
            'property_id',
            'property', 'message',
            'status', 'created_at'
            ]

        read_only_fields = ['status', 'created_at', 'tenant']