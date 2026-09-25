from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework import mixins, status
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend
from .models import User, Property, PropertyImage, Favorite, RentalRequest
from .serializers import (
    UserSerializer, PropertySerializer,
    PropertyImageSerializer, FavoriteSerializer,
    RentalRequestSerializer, UserRegistrationSerializer,
    ChangePasswordSerializer)
from .permissions import (
    IsPropertyOwner, IsLandLord,
    IsTenant, IsFavoriteSelectedUser,
    PropertyImageOwner, IsUserHimself,
    CanViewRentalRequest, IsRentalRequestOwner)
from .filters import PropertyFilter


class UserViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.DestroyModelMixin,
    GenericViewSet
):
    serializer_class = UserSerializer

    def get_queryset(self):

        if self.request.user.is_staff:
            return User.objects.all()

        return (User.objects.filter(id=self.request.user.id))

    def get_permissions(self):
        if self.action in ['list']:
            return [IsAdminUser()]
        if self.action in ['destroy', 'change_password', 'retrieve']:
            return [IsUserHimself()]
        return [IsAdminUser()]

    @action(detail=False, methods=['post'],
            permission_classes=[IsUserHimself])
    def change_password(self, request):
        serializer = ChangePasswordSerializer(
            data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
            'message': 'You successfully changed your password'
        })


class PropertyViewset(ModelViewSet):
    serializer_class = PropertySerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = PropertyFilter

    def get_queryset(self):
        return Property.objects.all().prefetch_related("images")

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        if self.action in ['create']:
            return [IsLandLord()]
        if self.action in ['destroy', 'update', 'partial_update']:
            return [IsPropertyOwner()]
        return [IsAdminUser()]

    def perform_create(self, serializer):
        serializer.save(landlord=self.request.user)


class PropertyLandlordViewset(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    GenericViewSet
):
    serializer_class = PropertySerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated and user.role == User.Role.LANDLORD:
            return Property.objects.filter(landlord=user).prefetch_related("images")
        return Property.objects.none()

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [IsLandLord()]
        return [IsAdminUser()]


class FavoriteViewset(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.DestroyModelMixin,
    GenericViewSet
):

    serializer_class = FavoriteSerializer

    def get_queryset(self):
        user = self.request.user

        if user.is_staff:
            return Favorite.objects.all()

        if user.is_authenticated and user.role == User.Role.TENANT:
            return Favorite.objects.filter(tenant=user)
        return Favorite.objects.none()

    def get_permissions(self):
        if self.action == 'create':
            return [IsTenant()]

        if self.action in ['list', 'retrieve', 'destroy']:
            return [IsFavoriteSelectedUser()]
        return [IsAdminUser()]

    def perform_create(self, serializer):
        serializer.save(tenant=self.request.user)


class PropertyImageViewset(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    mixins.RetrieveModelMixin,
    GenericViewSet
):
    serializer_class = PropertyImageSerializer

    def get_queryset(self):
        user = self.request.user
        if self.action in ["list", "retrieve"]:
            return PropertyImage.objects.all()
        if user.is_authenticated and user.role == User.Role.LANDLORD:
            return PropertyImage.objects.filter(property__landlord=user)
        return PropertyImage.objects.none()

    def get_permissions(self):
        if self.action == 'create':
            return [IsLandLord()]
        if self.action in ['destroy']:
            return [PropertyImageOwner()]
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsAdminUser()]


class RentalRequestViewset(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    GenericViewSet
):

    serializer_class = RentalRequestSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return RentalRequest.objects.all()
        if user.is_authenticated and user.role == User.Role.LANDLORD:
            return RentalRequest.objects.filter(property__landlord=user)
        if user.is_authenticated and user.role == User.Role.TENANT:
            return RentalRequest.objects.filter(tenant=user)
        return RentalRequest.objects.none()

    def get_permissions(self):
        if self.action == 'create':
            return [IsTenant()]
        if self.action in ['accept', 'reject']:
            return [IsRentalRequestOwner()]
        if self.action in ['list', 'retrieve']:
            return [CanViewRentalRequest()]
        return [IsAdminUser()]

    def perform_create(self, serializer):
        serializer.save(tenant=self.request.user)

    @action(detail=True, methods=['post'])
    def accept(self, request, pk=None):
        rental_request = self.get_object()

        # if the status is not PENDING it can't be changed
        if rental_request.status != RentalRequest.Status.PENDING:
            return Response({
                    'error': 'This request has already been proceded'
                }, status=status.HTTP_400_BAD_REQUEST)

        # we  verify if the landlord has ever accepted a request
        if RentalRequest.objects.filter(
            property=rental_request.property,
            status=RentalRequest.Status.ACCEPTED).exists():
            return Response(
                    {'error': "Another request has already been accepted for this property"},
                    status=status.HTTP_409_CONFLICT)

        # changing the status of the request we accepted
        rental_request.status = RentalRequest.Status.ACCEPTED
        rental_request.save()

        #  put all the resquest status to rejected because we already accept one
        RentalRequest.objects.filter(
            property=rental_request.property,
            status=RentalRequest.Status.PENDING
        ).exclude(
            pk=rental_request.pk).update(
            status=RentalRequest.Status.REJECTED)

        return Response({
            'message': 'Your request has been accepted'
        })

    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        rental_request = self.get_object()

        if rental_request.status != RentalRequest.Status.PENDING:
            return Response({
                'error': 'This request has already been proceded'
            }, status=status.HTTP_400_BAD_REQUEST)

        rental_request.status = RentalRequest.Status.REJECTED
        rental_request.save()
        return Response({
                'message': 'Your request has been rejected'
            })


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = UserRegistrationSerializer(data=request.data)
        # if something went wrong it'll automaticly raise the exceptions
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"user": serializer.data},
                        status=status.HTTP_201_CREATED)