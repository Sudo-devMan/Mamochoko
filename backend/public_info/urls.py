
from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()

router.register(r'about', views.AboutViewset, basename='about')
router.register(r'about-tab', views.AboutTabViewset, basename='about-tab')
router.register(r'uniform-image', views.UniformImageViewset, basename='uniform-image')
router.register(r'contact', views.ContactViewset, basename='contact')
router.register(r'school-times', views.SchoolTimeViewset, basename='school-times')

urlpatterns = []
urlpatterns += router.urls
