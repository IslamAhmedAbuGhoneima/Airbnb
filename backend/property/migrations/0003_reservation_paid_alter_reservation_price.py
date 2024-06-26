# Generated by Django 5.0.2 on 2024-04-10 17:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('property', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='reservation',
            name='paid',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='reservation',
            name='price',
            field=models.DecimalField(decimal_places=2, max_digits=7),
        ),
    ]
