from django.urls import path
from main.views.review_views import *


urlpatterns = [
    path("/<int:id>/get-all-reviews", GetAllProductReviews.as_view(), name="get-all-reviews"),
    path("/<int:id>/get-user-review", GetUserReview.as_view(), name="get-user-review"),
    path("/<int:id>/create-review", CreateReview.as_view(), name="create-review"),
    path("/<int:id>/edit-review", EditReview.as_view(), name="edit-review"),
    path("/<int:id>/delete-review", DeleteReview.as_view(), name="delete-review"),
]