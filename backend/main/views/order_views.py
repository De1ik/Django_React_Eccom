from ..serializers import ShippingInfoSerializer, OrderItemSerializer, OrderSerializer
from ..models import ShippingInfo, Order, OrderItem, Product

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from datetime import datetime

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger



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



class GetAllOrders(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            page = request.query_params.get('page')
            search = request.query_params.get('search', "")
            keyword = request.query_params.get('keyword', 0)

            user = request.user

            if search == "id":
                all_orders = Order.objects.filter(_id=keyword, user=user).order_by('-createdAt')
            else:
                all_orders = Order.objects.filter(user=user).order_by('-createdAt')
            
            paginator = Paginator(all_orders, 10)

            if not page:
                page = 1

            try:
                all_orders = paginator.page(page)
            except PageNotAnInteger:
                all_orders = paginator.page(1)
            except EmptyPage:
                all_orders = paginator.page(paginator.num_pages)    

            page = int(page)   

            serializer = OrderSerializer(all_orders, many=True)
            return Response({"orders": serializer.data, "page": page, "pages": paginator.num_pages})
        except Exception as e:
            return Response({"detail": f"Some error appeared: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)


class GetLatestOrders(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:


            user = request.user
            all_orders = Order.objects.filter(user=user).order_by('-createdAt')[0:3]
            

            serializer = OrderSerializer(all_orders, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"detail": f"Some error appeared: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)



class GetSpecificOrder(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        try:
            user = request.user

            try:
                order = Order.objects.get(_id=id)
            except:
                return Response({"detail": f"Some error appear when you try to see the order with id {id}"}, status=status.HTTP_404_NOT_FOUND)

            if (order.user == user or user.is_staff):
                order_serializer = OrderSerializer(order, many=False)
            else:
                return Response({"detail": "You are not allowed to see this order"}, status=status.HTTP_403_FORBIDDEN)
            
            try:
                order_items = OrderItem.objects.filter(order=order)
                order_items_serializer = OrderItemSerializer(order_items, many=True)
            except:
                return Response({"detail": f"Some error appear when you try to see the order with id {id}. Eroro with order items."}, status=status.HTTP_404_NOT_FOUND)
        
            try:
                order_shipp = ShippingInfo.objects.get(order=order)
                order_shipp_serializer = ShippingInfoSerializer(order_shipp, many=False)
            except:
                return Response({"detail": f"Some error appear when you try to see the order with id {id}. Error with shipping order."}, status=status.HTTP_404_NOT_FOUND)
            
            response_data = {
                "order": order_serializer.data,
                "orderItems": order_items_serializer.data,
                "orderShipping": order_shipp_serializer.data,
            }
            return Response(response_data, status=status.HTTP_200_OK)
        except:
                return Response({"detail": f"Some error appear when you try to see the order with id {id}"}, status=status.HTTP_400_BAD_REQUEST)
