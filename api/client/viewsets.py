from rest_framework import viewsets, response, decorators, status
from rest_framework.response import Response
from django.http import HttpResponse
from .filtersets import ClientFilter,BankFilter

from .serializers import ClientSerializer,BankSerializer
from .models import Client,Bank


class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    filter_class = ClientFilter

    @decorators.action(detail=False, methods=['get'])
    def get_user(self, request, pk=None):
        cpf = request.GET.get('cpf')
    
        queryset = Client.objects.filter(cpf=cpf)
        serealizer = ClientSerializer(queryset, many=True)

        return Response(serealizer.data)

class BankViewSet(viewsets.ModelViewSet):
    queryset = Bank.objects.all()
    serializer_class = BankSerializer
    filter_class = BankFilter

   
