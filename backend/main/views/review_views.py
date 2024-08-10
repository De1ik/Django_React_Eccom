from ..serializers import ReviewSerializer
from ..models import Product, Review

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework import status


class GetAllProductReviews(APIView):
    permission_classes = [AllowAny]

    def get(self, request, id):

        product = Product.objects.get(_id=id)


        product_reviews = product.review_set.all()

        serializer = ReviewSerializer(product_reviews, many=True) 

        return Response(serializer.data)


class GetUserReview(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):

        user = request.user
        product = Product.objects.get(_id=id)

        if (product.review_set.filter(user=user).exists()):
            user_review = product.review_set.get(user=user)
            serializer = ReviewSerializer(user_review, many=False) 
            return Response(serializer.data)
        return Response(status=status.HTTP_200_OK)  


class CreateReview(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, id):

        user = request.user
        data = request.data
        product = Product.objects.get(_id=id)

        if (product.review_set.filter(user=user).exists()):
            return Response({"details": "user comment already exists"}, status=status.HTTP_400_BAD_REQUEST)
        
        elif (data["rating"] == 0):
            return Response({"details": "rating must be more than zero"}, status=status.HTTP_400_BAD_REQUEST)
        
        review = Review.objects.create(
            user=user,
            product=product,
            name = user.first_name,
            comment=data["comment"],
            rating=data["rating"]
        )

        product_reviews = product.review_set.all()
        product.amountReviews = len(product_reviews)

        total_rating = sum(rev.rating for rev in product_reviews)

        product.rating = total_rating / len(product_reviews)
        
        product.save()

        serializer = ReviewSerializer(review, many=False) 

        return Response(serializer.data)
    

class EditReview(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, id):

        user = request.user
        data = request.data
        product = Product.objects.get(_id=id)

        if (not(product.review_set.filter(user=user).exists())):
            return Response({"details": "user comment not exist"}, status=status.HTTP_403_FORBIDDEN)
        
        elif (data["rating"] == 0):
            return Response({"details": "rating must be more than zero"}, status=status.HTTP_404_NOT_FOUND)
        
        review = product.review_set.get(user=user)

        review.comment=data["comment"]
        review.rating=data["rating"]

        product_reviews = product.review_set.all()
        product.amountReviews = len(product_reviews)

        total_rating = sum(rev.rating for rev in product_reviews)

        product.rating = total_rating / len(product_reviews)
        
        review.save()
        product.save()

        serializer = ReviewSerializer(review, many=False) 

        return Response(serializer.data)
    

class DeleteReview(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, id):

        user = request.user
        product = Product.objects.get(_id=id)

        if (not(product.review_set.filter(user=user).exists())):
            return Response({"details": "user comment not exist"}, status=status.HTTP_400_BAD_REQUEST)
        
        review = product.review_set.get(user=user)

        review.delete()

        return Response({"details": f"Comment for product {id} was deleted"}, status=status.HTTP_200_OK)