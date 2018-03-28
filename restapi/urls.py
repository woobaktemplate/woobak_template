from rest_framework.urlpatterns import format_suffix_patterns

from sentences.api.urls import sentences_urlpatterns
from examples.api.urls import examples_urlpatterns

urlpatterns = [
]
urlpatterns += sentences_urlpatterns
urlpatterns += examples_urlpatterns
urlpatterns = format_suffix_patterns(urlpatterns)
