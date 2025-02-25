# Thriftopia

Thriftopia is a Laravel-based e-commerce platform for thrift shopping.

## Installation

Follow these steps to set up the project:

1. Clone the repository:
```bash
git clone https://github.com/yourusername/thriftopia.git
cd thriftopia
```

2. Install PHP dependencies:
```bash
composer install
```

3. Set up environment file:
```bash
cp .env.example .env
```

4. Configure your database settings in `.env` file:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=thriftopia
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

5. Generate application key:
```bash
php artisan key:generate
```

6. Run database migrations and seeders:
```bash
php artisan migrate --seed
```

7. Install frontend dependencies and build assets:
```bash
pnpm install
pnpm run build
```

8. Start the development server:
```bash
php artisan serve
```

The application will be available at `http://localhost:8000`

## Default Admin Access

Use these credentials to access the admin panel at `/admin`:

```
email: superadmin@starter-kit.com
password: superadmin
```

## License

This project is licensed under the MIT License.
