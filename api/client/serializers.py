from rest_framework import serializers, decorators
from rest_framework.response import Response
from .models import Client, Bank


class BankSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bank
        fields = ('label', 'accountTypeLabel', 'accountNumber')


class ClientSerializer(serializers.ModelSerializer):
    bank = serializers.SerializerMethodField()

    def get_bank(self, obj):
        data = [
            {
                "label": obj.bank.label,
                "accountTypeLabel": obj.bank.accountTypeLabel,
                "accountNumber": obj.bank.accountNumber
            }
        ]
        return data

    class Meta:
        model = Client
        fields = ('__all__')
