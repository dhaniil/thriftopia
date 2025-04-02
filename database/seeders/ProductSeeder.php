<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            // Pakaian - Atasan
            [
                'name' => 'Vintage Levi\'s Denim Jacket',
                'description' => 'Jaket denim klasik Levi\'s dari era 90-an. Kondisi masih sangat bagus dengan patina yang cantik. Label merah masih terjaga.',
                'category_name' => 'Jaket',
                'is_active' => true,
            ],
            [
                'name' => 'Champion Reverse Weave Sweater',
                'description' => 'Sweater Champion original tahun 80-an. Bahan tebal dan hangat. Kondisi 9/10 dengan sedikit fade yang menambah karakter.',
                'category_name' => 'Sweater',
                'is_active' => true,
            ],
            [
                'name' => 'Tommy Hilfiger Stripe Shirt',
                'description' => 'Kemeja Tommy Hilfiger vintage dengan motif stripe. Bahan katun yang nyaman. Kondisi 8/10.',
                'category_name' => 'Kemeja',
                'is_active' => true,
            ],
            
            // Pakaian - Bawahan
            [
                'name' => 'Dickies 874 Work Pants',
                'description' => 'Celana kerja Dickies klasik. Bahan tebal dan tahan lama. Kondisi 9/10.',
                'category_name' => 'Celana Panjang',
                'is_active' => true,
            ],
            [
                'name' => 'Levi\'s 501 Vintage Jeans',
                'description' => 'Jeans Levi\'s 501 vintage dengan wash yang cantik. Kondisi 8/10 dengan distressing alami.',
                'category_name' => 'Celana Panjang',
                'is_active' => true,
            ],
            
            // Sepatu
            [
                'name' => 'Nike Air Force 1 Vintage',
                'description' => 'Nike AF1 vintage dalam kondisi 8/10. Sole masih bagus, upper terawat.',
                'category_name' => 'Casual',
                'is_active' => true,
            ],
            [
                'name' => 'Converse Chuck 70s High',
                'description' => 'Converse Chuck 70s High vintage. Kondisi 9/10 dengan patina yang bagus pada sole.',
                'category_name' => 'Casual',
                'is_active' => true,
            ],
            
            // Aksesoris
            [
                'name' => 'Vintage Coach Leather Bag',
                'description' => 'Tas Coach kulit vintage tahun 90-an. Kulit tebal dengan patina yang cantik.',
                'category_name' => 'Tote Bag',
                'is_active' => true,
            ],
            [
                'name' => 'Ralph Lauren Canvas Backpack',
                'description' => 'Backpack Ralph Lauren vintage dari kanvas. Kondisi 8/10, hardware masih bagus.',
                'category_name' => 'Backpack',
                'is_active' => true,
            ],
            [
                'name' => 'New Era Yankees Cap 90s',
                'description' => 'Topi New Era Yankees vintage 90s. Kondisi 9/10, patch masih jelas.',
                'category_name' => 'Baseball Cap',
                'is_active' => true,
            ]
        ];

        foreach ($products as $productData) {
            $category = Category::where('name', $productData['category_name'])->first();
            
            if ($category) {
                $product = Product::create([
                    'name' => $productData['name'],
                    'description' => $productData['description'],
                    'category_id' => $category->id,
                    'is_active' => $productData['is_active'],
                    'slug' => Str::slug($productData['name'])
                ]);
            }
        }
    }
}
