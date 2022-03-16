import shutil
import tempfile

from django.conf import settings
from django.test.runner import DiscoverRunner


# from https://stackoverflow.com/questions/65760369/django-unit-test-remove-files-created-inside-the-tests
class CustomTestRunner(DiscoverRunner):
    def setup_test_environment(self, **kwargs):
        settings.MEDIA_ROOT = tempfile.mkdtemp(dir=settings.MEDIA_ROOT)
        super(CustomTestRunner, self).setup_test_environment(**kwargs)

    def teardown_test_environment(self, **kwargs):
        shutil.rmtree(settings.MEDIA_ROOT)
        super(CustomTestRunner, self).teardown_test_environment(**kwargs)
