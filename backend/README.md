# Установка
```bash
# среда
cd backend
python -m venv venv  # python >= 3.7
source venv/bin/activate
pip install -r backend/requirements.txt

# данные
python manage.py migrate
python manage.py loaddata */fixtures/*.json  # тестовые данные
python manage.py createsuperuser
```

# Запуск
```bash
python manage.py runserver
```

Сбилдженная страница: [http://localhost:**8000**/companies](http://localhost:8000/companies)

API: http://localhost:**8000**/api/v1
