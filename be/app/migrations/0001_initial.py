# Generated by Django 5.0.3 on 2024-04-24 16:31

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Board',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_url', models.CharField(max_length=200)),
                ('title', models.CharField(max_length=100)),
                ('content', models.TextField(blank=True)),
                ('image_url', models.ImageField(upload_to='')),
                ('show', models.IntegerField(default=0)),
                ('like', models.IntegerField(default=0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('payment_method', models.CharField(max_length=100)),
                ('shipping_price', models.IntegerField()),
                ('total_price', models.IntegerField()),
                ('paid_at', models.DateTimeField()),
                ('is_delivered', models.BooleanField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('delivered_at', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Seller',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bs_number', models.IntegerField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('price', models.IntegerField()),
                ('description', models.TextField(blank=True)),
                ('image_url', models.ImageField(blank=True, upload_to='')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('rate', models.FloatField()),
                ('category_id', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='app.category')),
                ('seller_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.seller')),
            ],
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('qty', models.IntegerField()),
                ('price_multi_qty', models.IntegerField()),
                ('image', models.ImageField(upload_to='')),
                ('item_id', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='app.item')),
                ('order_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.order')),
            ],
        ),
        migrations.CreateModel(
            name='Shipping_Address',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.TextField()),
                ('city', models.CharField(max_length=200)),
                ('postal_code', models.CharField(max_length=100)),
                ('country', models.CharField(max_length=100)),
                ('shipping_price', models.IntegerField()),
                ('order_id', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='app.order')),
            ],
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('category_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tags', to='app.category')),
            ],
        ),
        migrations.AddField(
            model_name='item',
            name='tag_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='app.tag'),
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='name')),
                ('phone', models.CharField(max_length=20, verbose_name='phone')),
                ('address', models.TextField(blank=True, verbose_name='address')),
                ('nickname', models.CharField(max_length=50, verbose_name='nickname')),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='email')),
                ('image_url', models.URLField(blank=True, null=True, verbose_name='image_url')),
                ('description', models.TextField(blank=True, verbose_name='description')),
                ('is_seller', models.BooleanField(default=False)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='seller',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.user'),
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('content', models.TextField(blank=True)),
                ('rate', models.FloatField()),
                ('image_url', models.ImageField(blank=True, upload_to='')),
                ('item_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to='app.item')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='reviews_made', to='app.user')),
            ],
        ),
        migrations.CreateModel(
            name='Reply',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('replied_id', models.IntegerField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('board_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.board')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='app.user')),
            ],
        ),
        migrations.CreateModel(
            name='Refund',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reason', models.TextField(blank=True, verbose_name='refund reason')),
                ('status', models.CharField(max_length=100)),
                ('refund_amount', models.IntegerField()),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='CREATE DATE')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='UPDATE DATE')),
                ('order_item_id', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='app.orderitem')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='app.user')),
            ],
        ),
        migrations.AddField(
            model_name='order',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='app.user'),
        ),
        migrations.CreateModel(
            name='Item_QnA',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('content', models.TextField(blank=True)),
                ('image_url', models.ImageField(blank=True, upload_to='')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('item_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.item')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='app.user')),
            ],
        ),
        migrations.CreateModel(
            name='Item_Answer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('content', models.TextField(blank=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('item_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.item')),
                ('item_qna_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.item_qna')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='app.user')),
            ],
        ),
        migrations.CreateModel(
            name='Follow',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='created_at')),
                ('followed_id', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='user_id2', to='app.user')),
                ('follower_id', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='user_id1', to='app.user')),
            ],
        ),
        migrations.CreateModel(
            name='Bookmark',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('item_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.item')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.user')),
            ],
        ),
        migrations.AddField(
            model_name='board',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.user'),
        ),
        migrations.CreateModel(
            name='User_QnA',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100, verbose_name='title')),
                ('content', models.TextField(blank=True, verbose_name='content')),
                ('image_url', models.ImageField(blank=True, null=True, upload_to='user_qna_images', verbose_name='image_url')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='created_at')),
                ('user_id', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.DO_NOTHING, to='app.user')),
            ],
        ),
        migrations.CreateModel(
            name='User_Answer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('content', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='app.user')),
                ('user_qna_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.user_qna')),
            ],
        ),
    ]
