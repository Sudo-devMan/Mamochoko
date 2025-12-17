
from django.contrib import admin
from .models import (
    Contact,
    About,
    AboutTab,
    SchoolTime,
    UniformImage,
    # Review,
    # UserAction
)

admin.site.register(Contact)
admin.site.register(About)
admin.site.register(AboutTab)
admin.site.register(SchoolTime)
admin.site.register(UniformImage)
# admin.site.register(Review)
# admin.site.register(UserAction)
