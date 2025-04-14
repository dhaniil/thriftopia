<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesSeeder extends Seeder
{
    public function run()
    {
         // Buat permission
         Permission::create(['name' => 'admin panel']);
         Permission::create(['name' => 'view dashboard']);
 
         // Buat role
         $adminRole = Role::create(['name' => 'admin']);
         $userRole = Role::create(['name' => 'user']);
 
         // Assign permission ke role
         $adminRole->givePermissionTo(['admin panel', 'view dashboard']);
         $userRole->givePermissionTo(['view dashboard']);
    }
}
