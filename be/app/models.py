from django.db import models

# Create your models here.

class User(models.Model):
    name = models.CharField('name', max_length=100)
    phone = models.CharField('phone', max_length=20)
    address = models.TextField('address', blank=True) 
    nickname = models.CharField('nickname', max_length=50, blank=True)
    email = models.EmailField('email', max_length=254, unique=True)
    image_url = models.URLField('image_url', blank=True, null=True)
    description = models.TextField('description', blank=True)

    def __str__(self):
        return self.name


class Follow(models.Model):
    follower = models.ForeignKey('User', on_delete=models.CASCADE, related_name='user_id1', null=False, blank=True)
    followed = models.ForeignKey('User', on_delete=models.CASCADE, related_name='user_id2', null=False, blank=True)
    created_at = models.DateTimeField('created_at', auto_now_add=True)


class User_QnA(models.Model):
    user_id = models.ForeignKey('User', on_delete=models.CASCADE, null=False, blank=True)
    title = models.CharField('title', max_length=100)
    content = models.TextField('content', blank=True) 
    image_url = models.ImageField('image_url', upload_to='user_qna_images', null=True, blank=True)
    created_at = models.DateTimeField('created_at', auto_now_add=True)
