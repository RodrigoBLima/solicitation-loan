API
=========

## Development environment

How to install the development environment:

```
git clone <.git>
cd <dir>
mkdir env | virtualenv  -p python3 --no-site-packages env --prompt="[env]"
```

Create a .env file in the project root to define your personal environment settings.


```
DEBUG=True
STATIC_URL=/static/
DATABASE_URL='mysql://<user>:<password>@<host>:<port>/<database>'
```

```
source env/bin/activate
pip install -r requirements.txt
<!-- python manage.py migrate -->
<!-- python manage.py createsuperuser -->
```

Run Docker container 
```
docker run --name api-papelaria -v "$PWD":/usr/src/app -w /usr/src/app -p 8000:8000 -d django bash -c "pip install -r requirements.txt && python manage.py runserver 0.0.0.0:8000"

```
