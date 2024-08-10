from django.urls import path
from main.views.products_views import *


urlpatterns = [
    path("/", ListProducts.as_view(), name="products"),
    path("/<int:id>", ProductById.as_view(), name="products"),
    path("/top-rating", ProductTopReviews.as_view(), name="top-rating"),

]