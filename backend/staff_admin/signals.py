
from django.db.models.signals import post_delete
from django.dispatch import receiver
from django.db.models import FileField, ImageField

@receiver(post_delete)
def delete_supabase_files(sender, instance, **kwargs):
    for field in sender._meta.fields:
        if isinstance(field, (FileField, ImageField)):
            file = getattr(instance, field.name)
            if file:
                try:
                    file.delete(save=False)
                except Exception:
                    pass
