# Generated by Django 5.0.6 on 2024-06-03 14:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0014_alter_reply_replied_id_payment'),
    ]

    operations = [
        migrations.RenameField(
            model_name='payment',
            old_name='patmentId',
            new_name='paymentId',
        ),
    ]
