from ..serializers import UserSerializer, UserSerializerWithToken, ProductSerializer, OrderSerializer, ShippingInfoSerializer, OrderItemSerializer

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser



from django.contrib.auth.models import User
from ..models import *
from django.contrib.auth.hashers import make_password
from rest_framework import status

from django.db import IntegrityError

from datetime import datetime

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger




class AdminAllUsers(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):

        page =  request.query_params.get('page')
        search = request.query_params.get('search', "")

        if (search == "id"):
            id = request.query_params.get('keyword', 0)
            users = User.objects.filter(id=id).order_by('date_joined')
        elif (search == "name") :
            name = request.query_params.get('keyword', "")
            users = User.objects.filter(first_name__icontains=name).order_by('date_joined')
        elif (search == "email") :
            email = request.query_params.get('keyword', "")
            users = User.objects.filter(email__icontains=email).order_by('date_joined')
        else:    
            users = User.objects.all().order_by('date_joined')
        
        paginator = Paginator(users, 10)

        try:
            users = paginator.page(page)
        except PageNotAnInteger:
            users = paginator.page(1)
        except EmptyPage:
            users = paginator.page(paginator.num_pages)    

        if (not page):
            page = 1

        page = int(page)   

        
        serializer = UserSerializer(users, many=True)
        return Response({"users": serializer.data, "page": page, "pages": paginator.num_pages})  
    

class AdminGetUser(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, id):
        try:
            user = User.objects.get(id=id)

            serializer = UserSerializerWithToken(user, many = False)

            return Response(serializer.data, status=status.HTTP_200_OK)    
        except:
            return Response({"details": "get user error"}, status=status.HTTP_400_BAD_REQUEST)  


class AdminUpdateUserInfo(APIView):
    permission_classes = [IsAdminUser]

    def put(self, request, id):
        user = User.objects.get(id=id)
        data = request.data

        serializer = UserSerializerWithToken(user, many = False)

        user.email = data["email"]
        user.username = data["email"]
        user.first_name = data["first_name"]
        user.is_staff = data["is_staff"]

        user.save()

        return Response(serializer.data)
    

class AdminDeleteUser(APIView):
    permission_classes = [IsAdminUser]

    def delete(self, request, id):
        try:
            user = User.objects.get(id=id)
            user.delete()
            return Response({"Details": "User was successfully deleted"}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"Error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except IntegrityError:
            return Response({"Error": "Cannot delete user due to related records"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"Error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




class AdminAllProducts(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):

        page =  request.query_params.get('page')
        search =  request.query_params.get('search', "")

        if (search == "id"):
            id = request.query_params.get('keyword', 0)
            products = Product.objects.filter(_id=id).order_by('-createdAt')
        elif (search == "name") :
            name = request.query_params.get('keyword', "")
            products = Product.objects.filter(name__icontains=name).order_by('-createdAt')
        elif (search == "category") :
            category = request.query_params.get('keyword', "")
            products = Product.objects.filter(category__icontains=category).order_by('-createdAt')
        else:    
            products = Product.objects.all().order_by('-createdAt')
        
        paginator = Paginator(products, 10)

        try:
            products = paginator.page(page)
        except PageNotAnInteger:
            products = paginator.page(1)
        except EmptyPage:
            products = paginator.page(paginator.num_pages)    

        if (not page):
            page = 1

        page = int(page)   

        
        serializer = ProductSerializer(products, many=True)
        return Response({"products": serializer.data, "page": page, "pages": paginator.num_pages})  
    

class AdminGetProduct(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, id):
        try:
            product = Product.objects.get(_id=id)

            serializer = ProductSerializer(product, many = False)

            return Response(serializer.data, status=status.HTTP_200_OK)    
        except:
            return Response({"details": "get user error"}, status=status.HTTP_400_BAD_REQUEST)  
        

class AdminCreateProduct(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        data = request.data
        user = request.user


        product = Product.objects.create(
            user=user,
            name=data.get("name"),
            image=request.FILES.get("image", "sample.jpg"),
            brand=data.get("brand"),
            category=data.get("category"),
            description=data.get("description"),
            rating=data.get("rating", 0),
            amountReviews=data.get("amountReviews", 0),
            price=data.get("price"),
            amountStock=data.get("amountStock")
        )

        serializer = ProductSerializer(product, many = False)
        return Response(serializer.data)


class AdminUpdateProductInfo(APIView):
    permission_classes = [IsAdminUser]

    def put(self, request, id):
        product = Product.objects.get(_id=id)
        data = request.data

        serializer = ProductSerializer(product, many = False)

        product.name = data.get("name")
        if 'image' in request.FILES:
                print(product.image)
                product.image = request.FILES['image']
        # product.image = data["email"]
        product.brand = data.get("brand")
        product.category = data.get("category")
        product.description = data.get("description")
        product.price = data.get("price")
        product.amountStock = data.get("amountStock")


        product.save()

        return Response(serializer.data)
 

class AdminDeleteProduct(APIView):
    permission_classes = [IsAdminUser]

    def delete(self, request, id):
        try:
            product = Product.objects.get(_id=id)
            product.delete()
            return Response({"Details": "Product was successfully deleted"}, status=status.HTTP_200_OK)
        except Product.DoesNotExist:
            return Response({"Error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
        except IntegrityError:
            return Response({"Error": "Cannot delete product due to related records"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"Error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AdminGetAllOrders(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            page = request.query_params.get('page')
            search = request.query_params.get('search', "")
            keyword = request.query_params.get('keyword', 0)

            user = request.user

            if search == "id":
                all_orders = Order.objects.filter(_id=keyword).order_by('-createdAt')
            else:
                all_orders = Order.objects.all().order_by('-createdAt')
            
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



class MarkDeliveredOrder(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        user = request.user

        try:
            order = Order.objects.get(_id=id)
        except Order.DoesNotExist:
            return Response({"detail": f"Order with id {id} not found."}, status=status.HTTP_404_NOT_FOUND)

        if order.user != user and not user.is_staff:
            return Response({"detail": "You are not allowed to see this order"}, status=status.HTTP_403_FORBIDDEN)

        order.isDelivered = True
        order.deliveredAt = datetime.now().date() 
        order.save()

        order_serializer = OrderSerializer(order, many=False)

        try:
            order_items = OrderItem.objects.filter(order=order)
            order_items_serializer = OrderItemSerializer(order_items, many=True)
        except OrderItem.DoesNotExist:
            return Response({"detail": f"Order items for order with id {id} not found."}, status=status.HTTP_404_NOT_FOUND)

        try:
            order_shipp = ShippingInfo.objects.get(order=order)
            order_shipp_serializer = ShippingInfoSerializer(order_shipp, many=False)
        except ShippingInfo.DoesNotExist:
            return Response({"detail": f"Shipping info for order with id {id} not found."}, status=status.HTTP_404_NOT_FOUND)

        response_data = {
            "order": order_serializer.data,
            "orderItems": order_items_serializer.data,
            "orderShipping": order_shipp_serializer.data,
        }

        return Response(response_data, status=status.HTTP_200_OK)
    


class MarkPaidOrder(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        user = request.user

        try:
            order = Order.objects.get(_id=id)
        except Order.DoesNotExist:
            return Response({"detail": f"Order with id {id} not found."}, status=status.HTTP_404_NOT_FOUND)

        if order.user != user and not user.is_staff:
            return Response({"detail": "You are not allowed to see this order"}, status=status.HTTP_403_FORBIDDEN)

        order.isPaid = True
        order.paidAt = datetime.now().date() 
        order.save()

        order_serializer = OrderSerializer(order, many=False)

        try:
            order_items = OrderItem.objects.filter(order=order)
            order_items_serializer = OrderItemSerializer(order_items, many=True)
        except OrderItem.DoesNotExist:
            return Response({"detail": f"Order items for order with id {id} not found."}, status=status.HTTP_404_NOT_FOUND)

        try:
            order_shipp = ShippingInfo.objects.get(order=order)
            order_shipp_serializer = ShippingInfoSerializer(order_shipp, many=False)
        except ShippingInfo.DoesNotExist:
            return Response({"detail": f"Shipping info for order with id {id} not found."}, status=status.HTTP_404_NOT_FOUND)

        response_data = {
            "order": order_serializer.data,
            "orderItems": order_items_serializer.data,
            "orderShipping": order_shipp_serializer.data,
        }

        return Response(response_data, status=status.HTTP_200_OK)