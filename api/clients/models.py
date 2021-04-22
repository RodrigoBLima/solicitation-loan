from django.db import models

class Bank(models.Model):
    label = models.CharField(max_length=255, null=False)
    accountTypeLabel = models.CharField(
        max_length=255, verbose_name="Tipo de conta", null=True, blank=True)
    accountNumber = models.CharField(
        max_length=255, verbose_name="Número da conta", null=True, blank=True)


class Client(models.Model):
    name = models.CharField(max_length=255, null=False)
    bank = models.ForeignKey(
        Bank,  verbose_name="Banco", related_name="bank",on_delete=models.CASCADE)
    cvc = models.CharField(max_length=3, null=True,
                           blank=True, verbose_name="CVC")
    dt_valid = models.CharField(max_length=15, null=True,
                                blank=True, verbose_name="Validade cartão")
    phone = models.CharField(
        max_length=15, verbose_name="Número celular", blank=True)
    cpf = models.CharField(max_length=15, null=True,
                           blank=True, verbose_name="CPF", unique=True)

    def __str__(self):
        return self.name


