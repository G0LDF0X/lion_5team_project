# Generated by Django 5.0.3 on 2024-06-13 09:24

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0022_rename_board_id_image_tag_board_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='orderitem_id',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='orderitem_reviews', to='app.orderitem'),
        ),
    ]