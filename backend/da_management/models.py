
from django.db import models
from django.conf import settings
from django.utils import timezone

User = settings.AUTH_USER_MODEL

class Review(models.Model):
    name = models.CharField(max_length=100)
    picture = models.ImageField(null=True, blank=True, upload_to='reviewers')
    stars = models.DecimalField(max_digits=5, decimal_places=1, default=1.0)
    body = models.TextField(max_length=5000)
    pending = models.BooleanField(default=True)
    date = models.DateTimeField(auto_now_add=True)
    approved_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.name} | {self.stars} stars"


    class Meta:
        ordering = ['-date']

class UserAction(models.Model):
	user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
	action = models.CharField()
	time = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return f"{self.user.username} | {self.action[:5]}..."

# Implement this later on v4.1.0 [IMPLEMENTED]
class LearnerApplication(models.Model):
    GENDER = (
        ('Male', 'Male'),
        ('Female', 'Female')
    )
    PARENT_RELATIONS = (
        ('Mother', 'Mother'),
        ('Grandmother', 'Grandmother'),
        ('Aunt', 'Aunt'),
        ('Father', 'Father'),
        ('Grandfather', 'Grandfather'),
        ('Uncle', 'Uncle'),
        ('Sister', 'Sister'),
        ('Brother', 'Brother')
    )
    pending = models.BooleanField(default=True)
    rejected = models.BooleanField(default=False)
    approved_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='applications_approved')
    rejected_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='applications_rejected')

    grade_applied_for = models.IntegerField(default=8)
    highest_grade_passed = models.IntegerField(default=7)
    last_report = models.ImageField(upload_to='learner_applications/reports', blank=True, null=True)
    year_when_grade_was_passed = models.IntegerField(default=2025)

    learner_surname = models.CharField(max_length=50, blank=True)
    learner_first_name = models.CharField(max_length=50, blank=True)
    parent_surname = models.CharField(max_length=50, blank=True)
    parent_first_name = models.CharField(max_length=50, blank=True)
    parent_relation = models.CharField(max_length=100, choices=PARENT_RELATIONS, blank=True)
    date_of_birth = models.CharField(null=True, blank=True)
    gender = models.CharField(default="Female", choices=GENDER)
    id_or_passport = models.CharField(max_length=30, blank=True)
    citizenship = models.CharField(blank=True, null=True)
    country_of_residence = models.CharField(max_length=250, blank=True)

    phone = models.CharField(max_length=20, null=True, blank=True)
    picture = models.ImageField(upload_to='learner_applications', default='default.png')
    previous_school = models.CharField(null=True, blank=True)
    email = models.EmailField(max_length=150, blank=True)
	
    date_applied = models.DateTimeField(auto_now_add=True)
    date_approved = models.CharField(null=True, blank=True)
    date_rejected = models.CharField(null=True, blank=True)

    approved_reason = models.TextField(null=True, blank=True)
    rejected_reason = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.learner_surname} {self.learner_first_name} | Application for admission"
    
    class Meta:
        ordering = ['-date_applied']

class Moment(models.Model):
    title = models.CharField(max_length=100)
    body = models.TextField(default='One of Mamochoko\'s moments')
    facebook_link = models.URLField(null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['-date']


class MomentMedia(models.Model):
    moment = models.ForeignKey(Moment, on_delete=models.CASCADE, related_name='media')
    file = models.FileField(upload_to='moments')
    date = models.DateTimeField(auto_now_add=True)
    media_type = models.CharField(max_length=50, choices=[('image', 'Image'), ('video', 'Video')])

    def __str__(self):
        return f"{self.moment.user.username} | {self.moment.title} - {self.media_type}"
    
    class Meta:
        ordering = ['-date']

class Resource(models.Model):
    heading = models.CharField(max_length=100)
    body = models.TextField(max_length=255)
    document = models.FileField(upload_to='resources')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    upload_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} | {self.heading}"

    class Meta:
        ordering = ['-upload_date']

class Announcement(models.Model):
    title = models.CharField(max_length=100)
    body = models.TextField(max_length=1000)
    date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
	
    def __str__(self):
        return self.user.username + " | " + self.title
    
    class Meta:
        ordering = ['-date']

