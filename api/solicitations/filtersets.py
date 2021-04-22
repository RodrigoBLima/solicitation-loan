import rest_framework_filters as filters
from .models import Solicitation
from django.db import models as django_models
import django_filters


class SolicitationFilter(filters.FilterSet):
    class Meta:
        model = Solicitation
        fields = {
            'id':  ['exact'],
            
        }
