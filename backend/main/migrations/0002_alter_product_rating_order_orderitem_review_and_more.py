# Generated by Django 5.0.6 on 2024-06-21 11:58

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='rating',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True),
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('paymentMethod', models.CharField(blank=True, max_length=150, null=True)),
                ('taxPrice', models.DecimalField(decimal_places=2, max_digits=8)),
                ('shippingPrice', models.DecimalField(decimal_places=2, max_digits=8)),
                ('totalPrice', models.DecimalField(decimal_places=2, max_digits=8)),
                ('isPaid', models.BooleanField(default=False)),
                ('paidAt', models.DateField(blank=True, null=True)),
                ('isDelivered', models.BooleanField(default=False)),
                ('deliveredAt', models.DateField(blank=True, null=True)),
                ('createdAt', models.DateField(auto_now_add=True)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(blank=True, max_length=150, null=True)),
                ('amount', models.IntegerField(blank=True, default=1, null=True)),
                ('price', models.DecimalField(decimal_places=2, max_digits=8)),
                ('order', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='main.order')),
                ('product', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='main.product')),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(blank=True, max_length=150, null=True)),
                ('comment', models.TextField(blank=True, null=True)),
                ('rating', models.IntegerField(blank=True, default=5, null=True)),
                ('createdAt', models.DateField(auto_now_add=True)),
                ('product', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='main.product')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ShippingInfo',
            fields=[
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('adress', models.CharField(blank=True, max_length=150, null=True)),
                ('city', models.CharField(blank=True, max_length=150, null=True)),
                ('zipCode', models.CharField(blank=True, max_length=30, null=True)),
                ('country', models.CharField(blank=True, max_length=150, null=True)),
                ('shippingPrice', models.DecimalField(decimal_places=2, max_digits=8)),
                ('order', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='main.order')),
            ],
        ),
    ]
