# Generated by Django 5.0.3 on 2024-04-29 14:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_rename_user_id_user_answer_user_id2'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user_answer',
            old_name='user_id2',
            new_name='user_id',
        ),
    ]
