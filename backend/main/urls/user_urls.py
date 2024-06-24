from django.urls import path
from main.views.user_views import *



urlpatterns = [
    path("/profile", UserProfile.as_view(), name="user_profile"),
    path("/list", AllUsers.as_view(), name="all_users"),
    path("/registrate", RegisterUser.as_view(), name="user_registrate"),
    path('/login', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),

]