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

        for k, v in serializer.items():
            data[k] = v

        return data
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer    
    


class RegisterUser(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            data = request.data

            user = User.objects.create(
                email = data["email"],
                username = data["username"],
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
    
class AllUsers(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)    
