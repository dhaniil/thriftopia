<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Database\Seeder;

class ProductImageSeeder extends Seeder
{
    private $placeholderUrls = [
        'https://picsum.photos/800/1000', // Portrait
        'https://picsum.photos/1000/800', // Landscape
        'https://picsum.photos/800/800',  // Square
    ];

    public function run(): void
    {
        $products = Product::all();

        foreach ($products as $product) {
            // Add 3-5 images for each product
            $imageCount = rand(3, 5);
            
            for ($i = 0; $i < $imageCount; $i++) {
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => $this->placeholderUrls[array_rand($this->placeholderUrls)] . '?random=' . rand(1, 1000),
                    'is_primary' => $i === 0, // First image is primary
                ]);
            }
        }
    }
}
