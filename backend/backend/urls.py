
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenRefreshView
from da_management.views import TokenObtainView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/public-info/', include('public_info.urls')),
    path('api/v1/auth/', include('staff_admin.urls')), # staff_admin -> auth
    path('api/v1/management/', include('da_management.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('api/v1/auth/token/refresh/', TokenRefreshView.as_view()),
    path('api/v1/auth/token/access/', TokenObtainView.as_view())
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
