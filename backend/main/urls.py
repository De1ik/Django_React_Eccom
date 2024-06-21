from django.urls import path
from .views import *

urlpatterns = [
    path("routes", ListRoutes.as_view(), name="routes"),
    path("products", ListProducts.as_view(), name="products"),
    path("products/<int:id>", ProductById.as_view(), name="products"),
]