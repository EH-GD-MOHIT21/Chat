heroku config: export DJANGO_SETTINGS_MODULE=manager.settings
web: daphne manager.asgi:application
release: python manage.py migrate --noinput
