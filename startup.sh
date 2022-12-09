#!/bin/bash

# backend
cd backend
python3 -m virtualenv venv --python=python3.10
source venv/bin/activate
pip install -r requirements.txt

# frontend
cd ../frontend
npm install
