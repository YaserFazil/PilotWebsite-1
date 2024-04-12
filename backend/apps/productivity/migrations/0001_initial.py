# Generated by Django 5.0.1 on 2024-01-14 07:28

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("auth", "0012_alter_user_first_name_max_length"),
    ]

    operations = [
        migrations.CreateModel(
            name="Productivity",
            fields=[
                (
                    "user_id",
                    models.UUIDField(
                        db_index=True,
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                        unique=True,
                    ),
                ),
                ("total_full", models.IntegerField()),
                ("total_partial", models.IntegerField()),
                ("total_cancel", models.IntegerField()),
                ("total_double", models.IntegerField()),
                ("total_assignments", models.IntegerField()),
            ],
            options={
                "verbose_name": "productivity",
                "abstract": False,
            },
        ),
    ]
