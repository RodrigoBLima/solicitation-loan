# Generated by Django 2.1.5 on 2021-04-19 18:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('ratetable', '0001_initial'),
        ('client', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Solicitation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('installmentInterest', models.DecimalField(blank=True, decimal_places=2, max_digits=6, verbose_name='valor de juros')),
                ('installmentInterestValue', models.DecimalField(blank=True, decimal_places=2, max_digits=6, null=True, verbose_name='valor de juros da parcela')),
                ('comission', models.DecimalField(blank=True, decimal_places=2, max_digits=6, null=True, verbose_name='Comissão')),
                ('comissionValue', models.DecimalField(blank=True, decimal_places=2, max_digits=6, null=True, verbose_name='Valor da comissão')),
                ('installmentValue', models.PositiveIntegerField(blank=True, null=True, verbose_name='Valor da parcela')),
                ('cardNumber', models.CharField(blank=True, max_length=20, verbose_name='Número cartão de crédito')),
                ('desiredValue', models.PositiveIntegerField(blank=True, null=True, verbose_name='Valor desejado')),
                ('totalLoan', models.DecimalField(blank=True, decimal_places=2, max_digits=6, null=True, verbose_name='Empréstimo total')),
                ('installmentId', models.PositiveIntegerField(blank=True, null=True, verbose_name='Quantidade de parcelas')),
                ('clientId', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='client_id', to='client.Client', verbose_name='Cliente')),
                ('rateTableId', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='ratetable', to='ratetable.RateTable', verbose_name='Tabela')),
            ],
        ),
    ]
