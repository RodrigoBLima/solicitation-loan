import rest_framework_filters as filters
from .models import Client, Bank
from django.db import models as django_models
import django_filters


class ClientFilter(filters.FilterSet):
    class Meta:
        model = Client
        fields = {
            'id':  ['exact'],
            'cpf': ['exact'],

        }


class BankFilter(filters.FilterSet):
    class Meta:
        model: Bank
        fields: {
            "id": ['exact'],
        }
