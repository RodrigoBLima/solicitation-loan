from django.db import models

# Create your models here.

class Installments(models.Model):

    installments = models.PositiveIntegerField(
        null=True, blank=True, verbose_name="parcelas")
    installmentInterest = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, blank=True, verbose_name="juros parcelado")
    installmentValue = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, blank=True, verbose_name="valor da parcela")
    fullValue = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, blank=True, verbose_name="valor total")
    comission = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, blank=True, verbose_name="comissão")


class RateTable(models.Model):
    name = models.CharField(max_length=255, null=False)
    installments = models.ManyToManyField(
        Installments,  verbose_name="Juros")

    def __str__(self):
        return self.name
