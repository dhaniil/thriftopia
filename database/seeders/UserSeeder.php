<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin',
            'email' => 'admin@thriftopia.com',
            'password' => Hash::make('password'),
            'is_admin' => true,
        ]);

        // Create regular users
        User::factory()->count(10)->create();
    }
}
