python -m pip install pipenv
pipenv shell
pipenv install django djangorestframework django-cors-headers djongo pytz pymongo==3.12.3
cd tellemgram
python manage.py makemigrations
python manage.py migrate
python manage.py runserver