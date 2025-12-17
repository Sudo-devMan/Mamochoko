
from django.shortcuts import get_object_or_404
from .serializers import (
                            ReviewSerializer,
                            ResourceSerializer,
                            MomentSerializer,
                            CustomTokenObtainSerializer,
                            AnnouncementSerializer,
                            LearnerApplicationSerializer,
                            MomentMediaSerializer
                            )
from .models import Review, Resource, Moment, Announcement, LearnerApplication, MomentMedia
from rest_framework import viewsets, permissions, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model

User = get_user_model()

class TokenObtainView(TokenObtainPairView):
    serializer_class = CustomTokenObtainSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [permissions.AllowAny]
    authentication_classes = []

    def perform_update(self, serializer):
        serializer.save(approved_by=self.request.user)

@api_view(['PUT'])
def approve_review(r, id):
    review = get_object_or_404(Review, id=id)
    serializer = ReviewSerializer(review, data=r.data)
    if serializer.is_valid():
        serializer.save(approved_by=r.user)
        return Response(serializer.data, status=200)
    return Response(serializer.errors, status=400)

class ResourceViewSet(viewsets.ModelViewSet):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        print(self.request)
        serializer.save(user=self.request.user)

class MomentViewSet(viewsets.ModelViewSet):
    queryset = Moment.objects.all().order_by('-date')
    serializer_class = MomentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_serializer_context(self):
        ctx = super().get_serializer_context()
        ctx['request'] = self.request
        return ctx

class MomentsMediaViewSet(viewsets.ModelViewSet):
    serializer_class = MomentMediaSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = MomentMedia.objects.all().order_by('-date')

class AnnouncementViewSet(viewsets.ModelViewSet):
    queryset = Announcement.objects.all()
    serializer_class = AnnouncementSerializer

    def perform_create(self, serializer):
        try:
            serializer.save(user=self.request.user)
        except Exception as e:
            serializer.save(user=User.objects.get(username='Annonymous'))

class LearnerApplicationListCreate(generics.ListCreateAPIView):
    queryset = LearnerApplication.objects.all()
    serializer_class = LearnerApplicationSerializer
    permission_classes = [permissions.AllowAny]

class LearnerApplicationUpdate(generics.RetrieveUpdateDestroyAPIView):
    queryset = LearnerApplication.objects.all()
    serializer_class = LearnerApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    # def update(self, request, *args, **kwargs):
    #     if self.request.user.role is not 'Admin' or self.request.user.role is not 'Developer':
    #         raise permissions.exceptions.PermissionDenied
    #     return super().update(request, *args, **kwargs)
    
    def perform_update(self, serializer):
        instance = serializer.instance
        rejected = serializer.validated_data.get('rejected')
        pending = serializer.validated_data.get('pending')
        user = self.request.user

        if instance.pending == False or pending == False:
            if rejected == True:
                serializer.save(rejected_by=user)
            elif rejected == False:
                serializer.save(approved_by=user)
            else:
                serializer.save()

# class LearnerApplicationDetail(generics.RetrieveAPIView):
#     queryset = LearnerApplication.objects.all()
#     serializer_class = LearnerApplicationSerializer
#     permission_classes = [permissions.IsAuthenticated]


# @api_view(['PUT'])
# def approve_learner_application(r, id):
#     application = LearnerApplication.objects.get(id=id)
#     serializer = LearnerApplicationSerializer(data=r.data)
#     if serializer.is_valid():
#         serializer.save()
