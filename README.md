# Thriftopia

Thriftopia adalah platform e-commerce berbasis Laravel buat jual-beli barang thrift.

## Cara Install

Ikuti langkah-langkah berikut ya:

1. Clone dulu repo-nya:
```bash
git clone https://github.com/yourusername/thriftopia.git
cd thriftopia
```

2. Install dependency PHP:
```bash
composer install
```

3. Siapkan file environment:
```bash
cp .env.example .env
```

4. Setting database di file `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=thriftopia
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

5. Generate key aplikasi:
```bash
php artisan key:generate
```

6. Jalankan migration dan seeder:
```bash
php artisan migrate --seed
```

7. Install dependency frontend dan build assets:
```bash
pnpm install
pnpm run build
```

8. Jalankan server:
```bash
php artisan serve
```

Aplikasi bisa diakses di `http://localhost:8000`

## Akun Admin Default

Buat masuk ke panel admin di `/admin`, bisa pakai akun ini:

```
email: superadmin@starter-kit.com
password: superadmin
```

## Lisensi

Project ini dilindungi lisensi MIT.
