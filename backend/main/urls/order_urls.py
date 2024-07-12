from django.urls import path
from main.views.order_views import *


urlpatterns = [
    path("/create-order", CreateOrder.as_view(), name="create_order"),

]