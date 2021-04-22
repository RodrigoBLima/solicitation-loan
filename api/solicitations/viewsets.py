from rest_framework import viewsets, response, decorators, status
from rest_framework.response import Response
from django.http import HttpResponse
from .filtersets import SolicitationFilter

from solicitations.serializers import SolicitationSerializer
from .models import Solicitation
from installments.models import RateTable
from clients.models import Client

import django_filters.rest_framework
from rest_framework import generics


class SolicitationViewSet(viewsets.ModelViewSet):
    queryset = Solicitation.objects.all()
    serializer_class = SolicitationSerializer
    # filter_backends = [django_filters.rest_framework.DjangoFilterBackend]

    def create(self, request, *args, **kwargs):

        rateTableId = request.POST.get('rateTableId')
        clientId = request.POST.get('clientId')
        installmentInterest = request.POST.get('installmentInterest')
        installmentInterestValue = request.POST.get('installmentInterestValue')
        comission = request.POST.get('comission')
        comissionValue = request.POST.get('comissionValue')
        installmentValue = request.POST.get('installmentValue')
        cardNumber = request.POST.get('cardNumber')
        desiredValue = request.POST.get('desiredValue')
        totalLoan = request.POST.get('totalLoan')
        installmentId = request.POST.get('installmentId')

        rtb = RateTable.objects.get(id=rateTableId)
        cli = Client.objects.get(id=clientId)

        Solicitation.objects.create(rateTableId=rtb, clientId=cli,
                                    installmentInterest=installmentInterest,
                                    installmentInterestValue=installmentInterestValue,
                                    comission=comission,
                                    comissionValue=comissionValue,
                                    installmentValue=installmentValue,
                                    cardNumber=cardNumber,
                                    desiredValue=desiredValue,
                                    totalLoan=totalLoan,
                                    installmentId=installmentId)

        return Response({'save': 'true'}, status=status.HTTP_201_CREATED)
