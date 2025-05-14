<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run()
    {
        // Parent Categories
        $tshirt = Category::create([
            'name' => 'T-Shirt',
            'slug' => 'tshirt',
            'is_active' => true
        ]);

        $pants = Category::create([
            'name' => 'Pants',
            'slug' => 'pants',
            'is_active' => true
        ]);

        // Child Categories for T-Shirt
        Category::create([
            'name' => 'Polo Shirt',
            'slug' => 'polo-shirt',
            'parent_id' => $tshirt->id,
            'is_active' => true
        ]);

        Category::create([
            'name' => 'Casual Shirt',
            'slug' => 'casual-shirt',
            'parent_id' => $tshirt->id,
            'is_active' => true
        ]);

        // Child Categories for Pants
        Category::create([
            'name' => 'Jeans',
            'slug' => 'jeans',
            'parent_id' => $pants->id,
            'is_active' => true
        ]);

        Category::create([
            'name' => 'Chino',
            'slug' => 'chino',
            'parent_id' => $pants->id,
            'is_active' => true
        ]);
    }
}
