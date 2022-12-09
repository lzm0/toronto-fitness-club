#!/bin/bash

# backend
cd backend
source venv/bin/activate
python3 manage.py runserver &

# frontend
cd ../frontend
npm start

# kill all processes when the script is terminated
