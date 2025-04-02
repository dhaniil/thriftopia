<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Pakaian' => [
                'Atasan' => ['Kaos', 'Kemeja', 'Sweater', 'Jaket'],
                'Bawahan' => ['Celana Panjang', 'Celana Pendek', 'Rok'],
                'Dress' => ['Mini Dress', 'Midi Dress', 'Maxi Dress'],
                'Outerwear' => ['Cardigan', 'Hoodie', 'Blazer']
            ],
            'Sepatu' => [
                'Sneakers' => ['Casual', 'Sport', 'Vintage'],
                'Formal' => ['Pantofel', 'Loafers'],
                'Sandal' => ['Slip On', 'Strap']
            ],
            'Aksesoris' => [
                'Tas' => ['Backpack', 'Sling Bag', 'Tote Bag'],
                'Topi' => ['Baseball Cap', 'Bucket Hat', 'Beanie'],
                'Perhiasan' => ['Kalung', 'Gelang', 'Cincin']
            ]
        ];

        foreach ($categories as $mainCategory => $subCategories) {
            $main = Category::create([
                'name' => $mainCategory,
                'slug' => Str::slug($mainCategory),
                'is_active' => true,
            ]);

            foreach ($subCategories as $subCategory => $items) {
                $sub = Category::create([
                    'name' => $subCategory,
                    'slug' => Str::slug($subCategory),
                    'parent_id' => $main->id,
                    'is_active' => true,
                ]);

                foreach ($items as $item) {
                    Category::create([
                        'name' => $item,
                        'slug' => Str::slug($item),
                        'parent_id' => $sub->id,
                        'is_active' => true,
                    ]);
                }
            }
        }
    }
}
