from ..serializers import ProductSerializer
from ..models import Product

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.authentication import TokenAuthentication




class ListRoutes(APIView):
    permission_classes = [AllowAny]
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        return Response('Here must be routes')


class ListProducts(APIView):
    permission_classes = [AllowAny]
    authentication_classes = [TokenAuthentication]

    def get(self, request):

        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True) 

        return Response(serializer.data)
    

class ProductById(APIView):
    permission_classes = [AllowAny]
    authentication_classes = [TokenAuthentication]

    def get(self, request, id):
        product_by_id = Product.objects.get(_id=id)
        serializer = ProductSerializer(product_by_id, many=False) 
        return Response(serializer.data)    

    
