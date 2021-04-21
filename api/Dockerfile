# FROM django

# ADD . /api

# WORKDIR /api

# RUN pip install -r requirements.txt

# CMD [ "python", "./manage.py runserver 0.0.0.0:8000" ]


FROM python:3
ENV PYTHONUNBUFFERED=1
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/