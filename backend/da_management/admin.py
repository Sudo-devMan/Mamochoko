
from django.contrib import admin
from .models import (
    Review,
    UserAction,
    LearnerApplication,
    Moment,
    Resource,
    Announcement
)

admin.site.register(Review)
admin.site.register(UserAction)
admin.site.register(LearnerApplication)
admin.site.register(Moment)
admin.site.register(Resource)
admin.site.register(Announcement)
