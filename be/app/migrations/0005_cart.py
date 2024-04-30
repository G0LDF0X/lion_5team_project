# Generated by Django 5.0.3 on 2024-04-30 16:11

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_rename_user_id2_user_answer_user_id'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cart',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('qty', models.IntegerField()),
                ('image', models.ImageField(blank=True, upload_to='')),
                ('item_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.item')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.user')),
            ],
        ),
    ]