from rest_framework import serializers, decorators
from rest_framework.response import Response
from .models import Solicitation
from clients.models import Client


class SolicitationSerializer(serializers.ModelSerializer):

    client = serializers.SerializerMethodField()
    table = serializers.SerializerMethodField()

    def get_table(self, obj):
        return {"name": obj.rateTableId.name}

    def get_client(self, obj):

        data = {

            "name": obj.clientId.name,
            "phone": obj.clientId.phone,
            "cpf": obj.clientId.cpf,
            "cvc": obj.clientId.cvc,
            "dt_valid": obj.clientId.dt_valid,
            "bank":
                {
                    "label": obj.clientId.bank.label,
                    "accountTypeLabel": obj.clientId.bank.accountTypeLabel,
                    "accountNumber": obj.clientId.bank.accountNumber
                }
        }
        return data

    class Meta:
        model = Solicitation
        fields = ('installmentInterest',
                  'installmentInterestValue',
                  'comission',
                  'comissionValue',
                  'installmentValue',
                  'cardNumber',
                  'desiredValue',
                  'totalLoan',
                  'clientId',
                  'rateTableId',
                  'installmentId', 'client', 'table')

    def create(self, validated_data):
        return Solicitation.objects.create(**validated_data)