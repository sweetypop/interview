from rest_framework import viewsets

from companies.models import Region
from companies.serializers.region import RegionSerializer


class RegionSet(viewsets.ModelViewSet):
    queryset = Region.objects
    serializer_class = RegionSerializer
