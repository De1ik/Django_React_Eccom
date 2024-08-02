from ..serializers import UserSerializer, UserSerializerWithToken

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status






class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # @classmethod
    # def get_token(cls, user):
    #     token = super().get_token(user)

    #     token['username'] = user.username
    #     token['email'] = user.email

    #     return token
    
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data

        new_data = {}

        for k, v in serializer.items():
            new_data[k] = v

        return new_data
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer    
    

class UpdateUserInfo(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        data = request.data

        serializer = UserSerializerWithToken(user, many = False)

        user.email = data["email"]
        user.username = data["email"]
        user.first_name = data["first_name"]

        user.save()

        return Response(serializer.data)

class RegisterUser(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            data = request.data

            user = User.objects.create(
                email = data["email"],
                first_name = data["first_name"],
                password = make_password(data["password"]),
            )

            serializer = UserSerializerWithToken(user, many=False)
            return Response(serializer.data)
        except:
            message = {"message": "Email has already exist"}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)



class UserProfile(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data) 
     
