# Установка
```bash
cd frontend
npm install
```

# Запуск
```bash
# фронтэнд
sudo npm run serve
# бэкэнд
source venv/bin/activate
python backend/manage.py runserver
```
Страница: [http://localhost:**8080**/companies](http://localhost:8080/companies)

# Билд
```
npm run build
```
После билда в папке `backend/assets/bundles` сформируются минифицированные статик-файлы.  
Бэкэнд сможет раздавать их самостоятельно по адресу [http://localhost:**8000**/companies](http://localhost:8000/companies)
