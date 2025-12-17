
from rest_framework import serializers
from .models import (
                     Resource,
                     Review,
                     Moment,
                     MomentMedia,
                     Announcement,
                     LearnerApplication
                     )
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        data['user'] = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'role': user.role,
            'phone': user.phone,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'picture': self.context['request'].build_absolute_uri(user.picture.url)
        }

        return data

User = get_user_model()

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'role', 'picture']

class ResourceSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Resource
        fields = ['id', 'heading', 'body', 'document', 'user', 'upload_date']

class ReviewSerializer(serializers.ModelSerializer):
    approved_by = UserSerializer(read_only=True)
    class Meta:
        model = Review
        fields = ['id', 'name', 'picture', 'stars', 'body', 'pending', 'approved_by']

class MomentMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = MomentMedia
        fields = ['id', 'file', 'media_type', 'date']
        read_only_fields = ['id', 'media_type', 'date']
    
    def create(self, validated_data):
        file = validated_data.get('file')
        content_type = getattr(file, 'content_type', '')
        validated_data['media_type'] = 'video' if 'video' in content_type else 'image'
        return super().create(validated_data)

class MomentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    media = MomentMediaSerializer(many=True, read_only=True)
    media_uploads = serializers.ListField(
        child=serializers.FileField(max_length=100000, allow_empty_file=False, use_url=False),
        write_only=True,
        required=False
    )
    class Meta:
        model = Moment
        fields = ['id', 'user', 'title', 'body', 'date', 'facebook_link', 'media_uploads', 'media']
    
    def create(self, validated_data):
        request = self.context.get('request')
        user = request.user if request else None
        media_files = validated_data.pop('media_uploads', [])
        moment = Moment.objects.create(user=user, **validated_data)

        for f in media_files:
            content_type = getattr(f, 'content_type', '')
            media_type = 'video' if 'video' in content_type else 'image'
            MomentMedia.objects.create(moment=moment, file=f, media_type=media_type)
        
        return moment

    def update(self, instance, validated_data):
        media_files = validated_data.pop('media_uploads', [])
        instance.title = validated_data.get('title', instance.title)
        instance.body = validated_data.get('body', instance.body)
        instance.save()

        for f in media_files:
            content_type = getattr(f, 'content_type', '')
            media_type = 'video' if 'video' in content_type else 'image'
            MomentMedia.objects.create(moment=instance, file=f, media_type=media_type)

        return instance

class AnnouncementSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Announcement
        fields = ['id', 'title', 'body', 'date', 'user']

class LearnerApplicationSerializer(serializers.ModelSerializer):
    approved_by = UserSerializer(read_only=True)
    rejected_by = UserSerializer(read_only=True)
    class Meta:
        model = LearnerApplication
        fields = [
            'id', 'approved_by', 'rejected_by', 'pending', 'rejected',
            'grade_applied_for', 'highest_grade_passed', 'year_when_grade_was_passed', 'last_report',
            'learner_surname', 'learner_first_name',
            'parent_surname', 'parent_first_name',
            'parent_relation',
            'date_of_birth',
            'gender',
            'id_or_passport',
            'citizenship', 'country_of_residence',
            'phone', 'picture', 'previous_school', 'email',
            'date_applied', 'date_approved', 'date_rejected',
            'approved_reason', 'rejected_reason'
        ]
