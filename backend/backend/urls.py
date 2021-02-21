from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include(('companies.routers', 'companies'), namespace='companies-api')),
    path('companies', include(('companies.urls', 'companies'), namespace='companies-pages')),
]
