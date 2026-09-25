from django.core.management.base import BaseCommand
from django.db import IntegrityError
from faker import Faker
from decimal import Decimal
import random

from Rent_app.models import (
    User,
    Property,
    PropertyImage,
    Favorite,
    RentalRequest,
)


# ============================================================
# CONFIGURATION
# ============================================================

NUMBER_OF_LANDLORDS = 3
NUMBER_OF_TENANTS = 10
NUMBER_OF_PROPERTIES = 20
IMAGES_PER_PROPERTY = 2
NUMBER_OF_FAVORITES = 30
NUMBER_OF_RENTAL_REQUESTS = 15


class Command(BaseCommand):

    help = "Create test data for the Rental App"

    def handle(self, *args, **kwargs):

        fake = Faker()

        self.stdout.write("Création des données de test...")

        # ====================================================
        # 1. USERS
        # ====================================================

        landlords = []
        tenants = []

        # -----------------------------
        # Landlords
        # -----------------------------

        for i in range(NUMBER_OF_LANDLORDS):

            username = f"landlord{i + 1}"

            landlord = User.objects.create_user(
                username=username,
                email=f"{username}@example.com",
                password="Password123!",
                role=User.Role.LANDLORD,
            )

            landlords.append(landlord)

        self.stdout.write(
            self.style.SUCCESS(
                f"{NUMBER_OF_LANDLORDS} landlords créés."
            )
        )

        # -----------------------------
        # Tenants
        # -----------------------------

        for i in range(NUMBER_OF_TENANTS):

            username = f"tenant{i + 1}"

            tenant = User.objects.create_user(
                username=username,
                email=f"{username}@example.com",
                password="Password123!",
                role=User.Role.TENANT,
            )

            tenants.append(tenant)

        self.stdout.write(
            self.style.SUCCESS(
                f"{NUMBER_OF_TENANTS} tenants créés."
            )
        )

        # ====================================================
        # 2. PROPERTIES
        # ====================================================

        properties = []

        categories = [
            Property.Category.APPARTEMENT,
            Property.Category.STUDIO,
            Property.Category.HOUSE,
            Property.Category.DUPLEX,
        ]

        for i in range(NUMBER_OF_PROPERTIES):

            property = Property.objects.create(

                title=fake.sentence(nb_words=4).rstrip("."),

                description=fake.text(max_nb_chars=500),

                price=Decimal(
                    random.randint(300, 3000)
                ),

                address=fake.address(),

                rooms=random.randint(1, 6),

                bathrooms=random.randint(1, 3),

                surface=Decimal(
                    random.randint(30, 250)
                ),

                has_wifi=random.choice([True, False]),

                is_furnished=random.choice([True, False]),

                landlord=random.choice(landlords),

                google_maps_link=(
                    "https://maps.google.com/?q="
                    f"{random.uniform(33, 37)},"
                    f"{random.uniform(7, 12)}"
                ),

                category=random.choice(categories),
            )

            properties.append(property)

        self.stdout.write(
            self.style.SUCCESS(
                f"{NUMBER_OF_PROPERTIES} propriétés créées."
            )
        )

        # ====================================================
        # 3. PROPERTY IMAGES
        # ====================================================

        image_count = 0

        for property in properties:

            for image_number in range(1, IMAGES_PER_PROPERTY + 1):

                PropertyImage.objects.create(
                    property=property,
                    image=(
                        f"properties/"
                        f"property_{property.id}_"
                        f"{image_number}.jpg"
                    ),
                )

                image_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"{image_count} images créées."
            )
        )

        # ====================================================
        # 4. FAVORITES
        # ====================================================

        favorite_count = 0

        attempts = 0

        while favorite_count < NUMBER_OF_FAVORITES:

            tenant = random.choice(tenants)
            property = random.choice(properties)

            # Éviter les doublons
            if Favorite.objects.filter(
                tenant=tenant,
                property=property
            ).exists():
                attempts += 1

                if attempts > NUMBER_OF_FAVORITES * 10:
                    break

                continue

            Favorite.objects.create(
                tenant=tenant,
                property=property,
            )

            favorite_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"{favorite_count} favoris créés."
            )
        )

        # ====================================================
        # 5. RENTAL REQUESTS
        # ====================================================

        request_count = 0

        attempts = 0

        statuses = [
            RentalRequest.Status.PENDING,
            RentalRequest.Status.ACCEPTED,
            RentalRequest.Status.REJECTED,
        ]

        while request_count < NUMBER_OF_RENTAL_REQUESTS:

            tenant = random.choice(tenants)
            property = random.choice(properties)

            # Ton modèle possède une contrainte unique
            # tenant + property.
            if RentalRequest.objects.filter(
                tenant=tenant,
                property=property
            ).exists():

                attempts += 1

                if attempts > NUMBER_OF_RENTAL_REQUESTS * 10:
                    break

                continue

            RentalRequest.objects.create(

                tenant=tenant,

                property=property,

                message=fake.sentence(
                    nb_words=12
                ),

                status=random.choice(statuses),
            )

            request_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"{request_count} rental requests créées."
            )
        )

        # ====================================================
        # FIN
        # ====================================================

        self.stdout.write("")
        self.stdout.write(
            self.style.SUCCESS(
                "======================================"
            )
        )

        self.stdout.write(
            self.style.SUCCESS(
                "Seed terminé avec succès !"
            )
        )

        self.stdout.write(
            self.style.SUCCESS(
                "======================================"
            )
        )