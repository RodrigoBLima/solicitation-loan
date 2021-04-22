from rest_framework import serializers, decorators
from rest_framework.response import Response
from .models import Installments, RateTable


class InstallmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Installments
        fields = ('installments','installmentInterest','installmentValue','fullValue','comission')
    

class RateTableSerializer(serializers.ModelSerializer):
    installments = InstallmentsSerializer(many=True)

    class Meta:
        model = RateTable
        fields = ('__all__')
   