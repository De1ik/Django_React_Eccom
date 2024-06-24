from django.urls import path
from main.views.products_views import *


urlpatterns = [
    path("/routes", ListRoutes.as_view(), name="routes"),
    path("/", ListProducts.as_view(), name="products"),
    path("/<int:id>", ProductById.as_view(), name="products"),

]