import rest_framework_filters as filters
from .models import RateTable
from django.db import models as django_models
import django_filters


class RateTableFilter(filters.FilterSet):
    class Meta:
        model = RateTable
        fields = '__all__'

