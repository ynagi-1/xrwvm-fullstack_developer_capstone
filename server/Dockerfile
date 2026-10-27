FROM node:20-bookworm-slim AS frontend
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm install --no-audit --no-fund
COPY frontend/ ./
RUN npm run build
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
COPY --from=frontend /frontend/build ./frontend/build
RUN python manage.py collectstatic --noinput
EXPOSE 8000
CMD ["sh","-c","python manage.py migrate --noinput && python manage.py shell -c 'from djangoapp.populate import initiate; initiate()' && gunicorn --bind 0.0.0.0:${PORT:-8000} djangoproj.wsgi"]
