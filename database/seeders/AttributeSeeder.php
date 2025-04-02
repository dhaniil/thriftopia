<?php

namespace Database\Seeders;

use App\Models\Attribute;
use Illuminate\Database\Seeder;

class AttributeSeeder extends Seeder
{
    public function run(): void
    {
        $attributes = [
            [
                'name' => 'Ukuran',
            ],
            [
                'name' => 'Warna',
            ],
            [
                'name' => 'Kondisi',
            ],
            [
                'name' => 'Material',
            ],
            [
                'name' => 'Brand',
            ],
            [
                'name' => 'Jenis Kelamin',
            ],
            [
                'name' => 'Era',
            ]
        ];

        foreach ($attributes as $attribute) {
            Attribute::create($attribute);
        }
    }
}
