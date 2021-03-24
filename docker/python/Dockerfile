FROM python:3.9.2-slim-buster
RUN mkdir /app
WORKDIR /app
RUN apt update
RUN apt install -y gcc libmariadb-dev
COPY requirements.txt ./requirements.txt
RUN pip install -r requirements.txt