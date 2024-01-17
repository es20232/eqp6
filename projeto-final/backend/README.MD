## Como rodar o Django

Na pasta `tutoriais\tutorial-4-5` rodar os seguintes comandos para ativar o ambiente virtual
~~~bash
python -m venv venv
~~~

Para ativar o ambiente virtual no `Windows`
~~~bash
venv\Scripts\activate
~~~

Para ativar ambiente virtual no `Linux/macOS`
~~~bash
source venv/bin/activate
~~~

Instalar os módulos do projeto
~~~bash
pip install -r requirements.txt
~~~

Para rodar o serivor, usar os seguintes comandos na pasta `tutoriais\tutorial-4-5\tellemgram`:
~~~bash
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
~~~