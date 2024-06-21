from django.db import models
from django.contrib.auth.models import User


class Product(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=150, null=True, blank=True)
    image = models.ImageField(null=True, blank=True)
    brand = models.CharField(max_length=150, null=True, blank=True)
    category = models.CharField(max_length=150, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    amountReviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    amountStock = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    

class Review(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=150, null=True, blank=True)
    comment = models.TextField(null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=5)
    createdAt = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name
    
class Order(models.Model):
      _id = models.AutoField(primary_key=True, editable=False)
      user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
      paymentMethod = models.CharField(max_length=150, null=True, blank=True)
      taxPrice = models.DecimalField(max_digits=8, decimal_places=2)
      shippingPrice = models.DecimalField(max_digits=8, decimal_places=2)
      totalPrice = models.DecimalField(max_digits=8, decimal_places=2)
      isPaid = models.BooleanField(default=False)
      paidAt = models.DateField(auto_now_add=False, null=True, blank=True)
      isDelivered = models.BooleanField(default=False)
      deliveredAt = models.DateField(auto_now_add=False, null=True, blank=True)
      createdAt = models.DateField(auto_now_add=True)

      def __str__(self):
          return str(self.createdAt)
      
class OrderItem(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)  
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=150, null=True, blank=True)
    amount =  models.IntegerField(null=True, blank=True, default=1)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    image = models.CharField(max_length=150, null=True, blank=True)

    def __str__(self):
        return self.name

class ShippingInfo(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)  
    order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True)
    adress = models.CharField(max_length=150, null=True, blank=True)
    city = models.CharField(max_length=150, null=True, blank=True)
    zipCode = models.CharField(max_length=30, null=True, blank=True)
    country = models.CharField(max_length=150, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return str(self._id)
