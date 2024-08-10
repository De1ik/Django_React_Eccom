from django.urls import path
from main.views.admin_views import *
from main.views.order_views import GetSpecificOrder as AdminGetOrder



urlpatterns = [
    path("/all-users", AdminAllUsers.as_view(), name="all_users"),
    path("/delete-user/<int:id>", AdminDeleteUser.as_view(), name="delete_user"),
    path("/update-user/<int:id>", AdminUpdateUserInfo.as_view(), name="update_user"),
    path("/get-user/<int:id>", AdminGetUser.as_view(), name="get_user"),

    path("/all-products", AdminAllProducts.as_view(), name="all_products"),
    path("/get-product/<int:id>", AdminGetProduct.as_view(), name="get_product"),
    path("/create-product", AdminCreateProduct.as_view(), name="create_product"),
    path("/update-product/<int:id>", AdminUpdateProductInfo.as_view(), name="update_product"),
    path("/delete-product/<int:id>", AdminDeleteProduct.as_view(), name="delete_product"),

    path("/all-orders", AdminGetAllOrders.as_view(), name="all_orders"),
    path("/get-order/<int:id>", AdminGetOrder.as_view(), name="get_product"),
    path("/order-mark-delivered/<int:id>", MarkDeliveredOrder.as_view(), name="mark_delivered"),
    path("/order-paid-delivered/<int:id>", MarkPaidOrder.as_view(), name="mark_delivered"),
]