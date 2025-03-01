1. Clone Repo ini
```
git clone https://github.com/dhaniil/thriftopia
```
2. Install dependency
```composer install && npm install``` atau ```pnpm install```

3. Copy ```.env.example .env```
4. Edit ini
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=urdatabase
DB_USERNAME=root
DB_PASSWORD=
```

5. Buat app key ```php artisan key:generate```
6.Jalankan migrasi ```php artisan migration```
