from ..serializers import ShippingInfoSerializer, OrderItemSerializer, OrderSerializer
from ..models import ShippingInfo, Order, OrderItem, Product

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication



class CreateOrder(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        user = request.user
        data = request.data
        
        order_data = data.get('orderData')
        shipping_data = data.get('shippingData')
        order_items_data = data.get('orderItemsData')

        order_serializer = OrderSerializer(data=order_data)
        if order_serializer.is_valid():
            order = order_serializer.save(user=user)
        else:
            return Response(order_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

        shipping_serializer = ShippingInfoSerializer(data=shipping_data)
        if shipping_serializer.is_valid():
            shipping_serializer.save(order=order)
        else:
            return Response(shipping_serializer.errors, status=status.HTTP_400_BAD_REQUEST)   


        for order_item in order_items_data:
            product_by_id = Product.objects.get(_id=order_item["product_id"])
            try:
                product_by_id.amountStock -= order_item["amount"]
            except:
                return Response("Product already out of stock", status=status.HTTP_400_BAD_REQUEST)  
            product_by_id.save()
            order_item["product"] = product_by_id._id
            order_item["name"] = product_by_id.name
            order_item["price"] = product_by_id.price
            order_item["image"] = str(product_by_id.image)
            order_item["order"] = order._id
            order_item_serializer = OrderItemSerializer(data=order_item)
            if order_item_serializer.is_valid():
                order_item_serializer.save(order=order)
            else:
                return Response(order_item_serializer.errors, status=status.HTTP_400_BAD_REQUEST)  



        response_data = {
            'order': order_serializer.data,
            'shipping': shipping_serializer.data
        }

        return Response(response_data, status=status.HTTP_201_CREATED)