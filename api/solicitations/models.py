from django.db import models

# Create your models here.

class Solicitation(models.Model):
    installmentInterest = models.DecimalField(
        max_digits=6, decimal_places=2, verbose_name="valor de juros", blank=True)
    installmentInterestValue = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, blank=True, verbose_name="valor de juros da parcela")
    comission = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, blank=True, verbose_name="Comissão")
    comissionValue = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, blank=True, verbose_name="Valor da comissão")
    installmentValue = models.DecimalField(
        null=True, max_digits=6, decimal_places=2, blank=True, verbose_name="Valor da parcela")
    cardNumber = models.CharField(
        max_length=20, blank=True, verbose_name="Número cartão de crédito")
    desiredValue = models.PositiveIntegerField(
        null=True, blank=True, verbose_name="Valor desejado")
    totalLoan = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, blank=True, verbose_name="Empréstimo total")
    clientId = models.ForeignKey(
        'clients.Client', on_delete=models.PROTECT, verbose_name="Cliente", related_name='client_id')
    rateTableId = models.ForeignKey(
        'installments.RateTable', on_delete=models.PROTECT, verbose_name="Tabela", related_name='ratetable')
    installmentId = models.PositiveIntegerField(
        null=True, blank=True, verbose_name="Quantidade de parcelas")

