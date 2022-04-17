rm -rf media
rm db.sqlite3
python manage.py migrate
python gendata.py
