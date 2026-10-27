# fullstack_developer_capstone

Repository name: `xrwvm-fullstack_developer_capstone`.
Project name: `fullstack_developer_capstone`.

Best Cars dealership review portal built from the IBM Skills Network starter.

## Architecture
React provides registration, login, dealer filtering and review forms. Django
authenticates users, manages car makes/models in SQLite and proxies requests to
the Express/MongoDB dealer service and Flask/NLTK sentiment microservice.
Only authenticated users can submit reviews; the server supplies the author.

## Run
`docker compose up --build` starts MongoDB, Express, sentiment and the Django/React
application at http://localhost:8000. Demo data is inserted only into empty
collections. Run `python manage.py createsuperuser` in the web container to create
an administrator. Set DJANGO_SECRET_KEY, ALLOWED_HOSTS and trusted origins for
your deployment. Do not commit credentials or database files.

## Verification
GitHub Actions builds React, runs Django checks and tests, checks Node syntax and
builds the application Docker image. The Kubernetes deployment is in deployment.yaml.
The application is an educational demonstration using supplied synthetic data.
