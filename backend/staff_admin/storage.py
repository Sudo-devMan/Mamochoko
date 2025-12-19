from supabase import create_client
from django.core.files.storage import Storage
from django.conf import settings
import uuid

supabase = create_client(
    settings.SUPABASE_URL,
    settings.SUPABASE_SERVICE_ROLE_KEY,
)

class SupabaseStorage(Storage):
    bucket = "mamochoko_bucket"

    def _save(self, name, content):
        ext = name.split(".")[-1]
        unique_name = f"{uuid.uuid4()}.{ext}"
        path = unique_name

        supabase.storage.from_(self.bucket).upload(
            path,
            content.read(),
            {"content-type": getattr(content, "content_type", "application/octet-stream")},
        )
        return path

    def delete(self, name):
        if name:
            try:
                supabase.storage.from_(self.bucket).remove([name])
            except Exception:
                pass

    def url(self, name):
        if not name:
            return ""
        result = supabase.storage.from_(self.bucket).get_public_url(name)
        return result
