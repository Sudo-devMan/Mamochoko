
from django.db import models
from django.conf import settings
from datetime import datetime

User = settings.AUTH_USER_MODEL


class Contact(models.Model):
	address = models.TextField(default='Limpopo, Polokwane, Moletjie, Ga-Kobo, Stand no. 406 PO BOX 3192, KOLOTI 0709')
	email = models.EmailField(default='mamochokos@gmail.com')
	phone = models.CharField(default='066 559 8863')
	facebook = models.URLField(default='#facebook_page_link')
	image = models.ImageField(null=True, blank=True, upload_to='contact_imgs')
	logo = models.ImageField(null=True, blank=True, upload_to='logos')
	visiting_hours = models.CharField(default='10:45-11:30')

	def __str__(self):
		return f"Address | {self.address}"

class About(models.Model):
	years = datetime.now().year - 2016
	about_text = models.TextField(default='Founded in 2016, Mamochoko Secondary School is commited to providing quality education in the heart of Moletjie, Ga-Kobo')
	about_image = models.ImageField(null=True, blank=True, upload_to='about_imgs')
	moments_image = models.ImageField(null=True, blank=True, upload_to='moments_imgs')
	resources_image = models.ImageField(null=True, blank=True, upload_to='resources_imgs')
	hero_img = models.ImageField(null=True, blank=True, upload_to='heros')
	mission = models.TextField(default='Motivate staff and members on a continuous basis in order to promote the spirit of learning and teaching to produce high quality education.')
	vision = models.TextField(default='To equipt our learners with high quality education that will provide them with skill, knowledge and values necessary to produce marketable citizens.')
	# history_and_achievements = models.TextField(default=f'Over the past {years} years, our students have excelled in competitions, achieved top matric results, and made our community proud.')
	# facilities_and_programs = models.TextField(default=f'Our campus includes mordern sports equipment for our sports-loving students, whiteboards for flexible learning integration, sports fields (netball & soccer), and much more.')
	# community_and_culture = models.TextField(default="We foster a supportive and inclusive environment where students are encouraged to explore their passions and grow academically and personally. We live by our motto \"Preparing Future Leaders\" on a daily basis; through our teachers' guidance and support, we shape our students into great future leaders of tomorrow.")

	def __str__(self):
		return f"About Mamochoko | {self.mission}"

class AboutTab(models.Model):
	title = models.CharField(max_length=255)
	text = models.TextField()

	def __str__(self):
		return f"{self.title} | {self.text[:7]}..."

class SchoolTime(models.Model):
	time = models.TimeField(blank=True, null=True)
	text = models.CharField()

	class Meta:
		ordering = ['time']

	def __str__(self):
		return f"{self.text} - {self.time}"

class UniformImage(models.Model):
	image = models.ImageField(null=True, blank=True, upload_to='uniform_imgs')
	name = models.CharField(null=True, blank=True)

	def __str__(self):
		return f"{self.name} - {self.id}"


