<?php

namespace Database\Seeders;

use App\Models\ShippingAddress;
use App\Models\User;
use Illuminate\Database\Seeder;

class ShippingAddressSeeder extends Seeder
{
    private $cities = [
        'Jakarta Selatan',
        'Jakarta Pusat',
        'Jakarta Barat',
        'Jakarta Timur',
        'Jakarta Utara',
        'Bandung',
        'Surabaya',
        'Yogyakarta',
        'Semarang',
        'Malang'
    ];

    private $areas = [
        'Kebayoran Baru',
        'Menteng',
        'Kemang',
        'Kuningan',
        'Senayan',
        'Sudirman',
        'Thamrin',
        'Kelapa Gading',
        'BSD',
        'Alam Sutera'
    ];

    public function run(): void
    {
        $users = User::all();

        foreach ($users as $user) {
            // Add 1-3 addresses for each user
            $addressCount = rand(1, 3);
            
            for ($i = 0; $i < $addressCount; $i++) {
                $city = $this->cities[array_rand($this->cities)];
                $area = $this->areas[array_rand($this->areas)];
                
                ShippingAddress::create([
                    'user_id' => $user->id,
                    'name' => $user->name,
                    'phone' => '08' . rand(1000000000, 9999999999),
                    'address' => 'Jl. ' . $this->generateStreetName() . ' No. ' . rand(1, 200) . ', ' . $area,
                    'city' => $city,
                    'postal_code' => rand(10000, 99999),
                    'is_default' => $i === 0 // First address is default
                ]);
            }
        }
    }

    private function generateStreetName(): string
    {
        $prefixes = ['Sudirman', 'Thamrin', 'Asia', 'Pemuda', 'Diponegoro', 'Gatot Subroto', 'Pahlawan', 'Merdeka'];
        $types = ['Raya', 'Besar', 'Utama'];
        
        return $prefixes[array_rand($prefixes)] . ' ' . $types[array_rand($types)];
    }
}
