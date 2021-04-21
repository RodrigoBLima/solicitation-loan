# Generated by Django 2.1.5 on 2021-04-21 14:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('client', '0003_client_bank'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='client',
            name='bank',
        ),
        migrations.AddField(
            model_name='client',
            name='bank',
            field=models.ManyToManyField(related_name='bank', to='client.Bank', verbose_name='Banco'),
        ),
    ]
