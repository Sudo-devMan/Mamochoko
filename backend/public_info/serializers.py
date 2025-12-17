
from .models import UniformImage ,About, AboutTab, SchoolTime, UniformImage, Contact
from rest_framework import serializers

class AboutSerializer(serializers.ModelSerializer):
    class Meta:
        model = About
        fields = ['id', 'years', 'about_image', 'moments_image', 'resources_image', 'hero_img', 'mission', 'vision']

class AboutTabSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutTab
        fields = ['id', 'title', 'text']

class SchoolTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchoolTime
        fields = ['id', 'time', 'text']

class UniformImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UniformImage
        fields = ['id', 'image', 'name']

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'address', 'email', 'phone', 'facebook', 'image', 'logo', 'visiting_hours']



