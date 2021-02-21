import os
from .settings_base import *


DEBUG = True


INSTALLED_APPS += [
    'webpack_loader',
    'rest_framework',
    'companies.apps.CompaniesConfig'
]


if DEBUG:
    CORS_ALLOWED_ORIGINS = [
        'http://localhost:8080',
        'http://127.0.0.1:8080',
        'http://localhost:8000',
        'http://127.0.0.1:8000',
    ]
    INSTALLED_APPS += [
        'corsheaders',
    ]
    MIDDLEWARE += [
        'corsheaders.middleware.CorsMiddleware',
    ]
    CORS_ALLOW_CREDENTIALS = True


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


STATIC_ROOT = os.path.join(BASE_DIR, "static/")
STATICFILES_DIRS = [os.path.join(BASE_DIR, "assets/")]

WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'bundles/',
        'STATS_FILE': os.path.join(
            BASE_DIR,
            'assets',
            'bundles',
            'webpack-build-stats.json'
        ),
    },
}


REST_FRAMEWORK = {
    'DEFAULT_PARSER_CLASSES': (
        'rest_framework.parsers.JSONParser',
    ),
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.AllowAny',
    ),
}
