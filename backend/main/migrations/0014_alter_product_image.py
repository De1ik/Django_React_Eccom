# Generated by Django 5.0.6 on 2024-08-15 16:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0013_alter_product_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, default='sample.jpg', null=True, upload_to=''),
        ),
    ]
