from rest_framework import serializers

from companies.models import Region


class RegionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Region
        fields = (
            'code',
            'name',
        )
