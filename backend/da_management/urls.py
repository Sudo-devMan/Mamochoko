
from rest_framework.routers import DefaultRouter
from django.urls import path
from . import views

router = DefaultRouter()

router.register(r'reviews', views.ReviewViewSet, basename='reviews')
router.register(r'resources', views.ResourceViewSet, basename='resources')
router.register(r'moments', views.MomentViewSet, basename='moments')
router.register(r'announcements', views.AnnouncementViewSet, basename='announcements')
router.register(r'moment-media', views.MomentsMediaViewSet, basename='moment-media')

urlpatterns = [
    path('learner-applications/', views.LearnerApplicationListCreate.as_view(), name='learner-applications'),
    path('learner-applications/<int:pk>/', views.LearnerApplicationUpdate.as_view(), name='learner-application-update'),
    path('reviews/<int:id>/approve/', views.approve_review, name='approve-review')
]

urlpatterns += router.urls
