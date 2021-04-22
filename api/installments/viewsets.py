from rest_framework import viewsets, response, decorators, status
from rest_framework.response import Response
from django.http import HttpResponse
from .filtersets import RateTableFilter

from .serializers import RateTableSerializer,InstallmentsSerializer
from .models import RateTable, Installments


class RateTableViewSet(viewsets.ModelViewSet):
    queryset = RateTable.objects.all()
    serializer_class = RateTableSerializer
    # filter_class = RateTableFilter

    # filter data table where value solicited is equal a database data
    @decorators.action(detail=False, methods=['get'])
    def installment_value(self, request, pk=None):
        installment = request.GET.get('installment')

        queryset = RateTable.objects.filter(
            installments__installmentValue=installment)

        serealizer = RateTableSerializer(queryset, many=True)

        return Response(serealizer.data)


class InstallmentsViewSet(viewsets.ModelViewSet):
    queryset = Installments.objects.all()
    serializer_class = InstallmentsSerializer


   