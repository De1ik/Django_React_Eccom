from ..serializers import ProductSerializer
from ..models import Product

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.authentication import TokenAuthentication

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger






class ListProducts(APIView):
    permission_classes = [AllowAny]
    authentication_classes = [TokenAuthentication]

    def get(self, request):

        order_mapping = {
            "high-price": "-price",
            "low-price": "price",
            "high-rating": "-rating",
            "low-rating": "rating",

        }

        query = request.query_params.get('keyword', "")
        page =  request.query_params.get('page', 1)
        user_order = request.query_params.get("order", "")
        order_field = order_mapping.get(user_order, 'createdAt')


        products = Product.objects.filter(name__icontains=query)

        products = products.order_by(order_field)

        paginator = Paginator(products, 8)


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
    

class ProductById(APIView):
    permission_classes = [AllowAny]
    authentication_classes = [TokenAuthentication]

    def get(self, request, id):
        product_by_id = Product.objects.get(_id=id)
        serializer = ProductSerializer(product_by_id, many=False) 
        return Response(serializer.data)    
    

class ProductTopReviews(APIView):

    def get(self, request):
        products = Product.objects.order_by('-rating')[0:5]
        serializer = ProductSerializer(products, many=True) 
        return Response(serializer.data)    

    
