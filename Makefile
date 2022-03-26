#!/bin/bash
sudo docker build -t some-content-nginx .
sudo docker-compose build
sudo docker-compose up
