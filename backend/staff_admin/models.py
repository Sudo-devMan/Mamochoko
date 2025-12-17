
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

User = settings.AUTH_USER_MODEL

class CustomUser(AbstractUser):
	phone = models.CharField(max_length=20, default='no number')
	picture = models.ImageField(upload_to='profiles', default='default.png')
	role = models.CharField(default='Guest')

	def __str__(self):
		return self.username

class Note(models.Model):
	title = models.CharField(max_length=100)
	content = models.TextField()
	created = models.DateTimeField(auto_now_add=True)
	author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')

	def __str__(self):
		return f"{self.author.username} | {self.title}"



