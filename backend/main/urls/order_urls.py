from django.urls import path
from main.views.order_views import *


urlpatterns = [
    path("/create-order", CreateOrder.as_view(), name="create_order"),
    path("/all-orders", GetAllOrders.as_view(), name="get_all_orders"),
    path("/latest-orders", GetLatestOrders.as_view(), name="get_latest_orders"),
    path("/get-order-<int:id>", GetSpecificOrder.as_view(), name="get_specific_order"),
]