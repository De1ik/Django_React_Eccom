# Generated by Django 5.0.6 on 2024-07-20 14:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0010_alter_product_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, default='/images/default-product-image.png', upload_to=''),
        ),
    ]
