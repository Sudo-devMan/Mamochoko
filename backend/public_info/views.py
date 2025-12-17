
from django.shortcuts import render
from .models import UniformImage ,About, AboutTab, SchoolTime, UniformImage, Contact
from .serializers import AboutSerializer, AboutTabSerializer, SchoolTimeSerializer, UniformImageSerializer, ContactSerializer
from rest_framework import viewsets, permissions


class AboutViewset(viewsets.ModelViewSet):
    queryset = About.objects.all()
    serializer_class = AboutSerializer
    lookup_field = 'id'
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class AboutTabViewset(viewsets.ModelViewSet):
    queryset = AboutTab.objects.all()
    serializer_class = AboutTabSerializer
    lookup_field = 'id'
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class UniformImageViewset(viewsets.ModelViewSet):
    queryset = UniformImage.objects.all()
    serializer_class = UniformImageSerializer
    lookup_field = 'id'
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class SchoolTimeViewset(viewsets.ModelViewSet):
    queryset = SchoolTime.objects.all()
    serializer_class = SchoolTimeSerializer
    lookup_field = 'id'
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ContactViewset(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    lookup_field = 'id'
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

# Create your views here.
