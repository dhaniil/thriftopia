<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductVariant;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $categories = Category::whereNotNull('parent_id')->get();

        foreach ($categories as $category) {
            // Array of CDN image URLs for products
            $imageUrls = [
                'https://i.ibb.co/C6pJ0Xk/tshirt-1.jpg',
                'https://i.ibb.co/fDvs2Gy/tshirt-2.jpg',
                'https://i.ibb.co/BLgcNx2/tshirt-3.jpg',
                'https://i.ibb.co/TmXCrXj/tshirt-4.jpg',
                'https://i.ibb.co/dKKFXdZ/tshirt-5.jpg',
                'https://i.ibb.co/xgZxrRb/pants-1.jpg',
                'https://i.ibb.co/GV0gdHw/pants-2.jpg',
                'https://i.ibb.co/7CQVJNm/pants-3.jpg',
                'https://i.ibb.co/dpNVXPp/pants-4.jpg',
                'https://i.ibb.co/wS6ZFr7/pants-5.jpg',
            ];

            // Create 10 products for each child category
            for ($i = 1; $i <= 10; $i++) {
                $product = Product::create([
                    'name' => "Product {$i} - {$category->name}",
                    'slug' => Str::slug("Product {$i} - {$category->name}"),
                    'description' => "Description for Product {$i} in category {$category->name}",
                    'price' => rand(50000, 500000),
                    'stock' => 0, // Stock will be managed through variants
                    'category_id' => $category->id,
                    'is_active' => true,
                ]);

                // Create image for product
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => $imageUrls[array_rand($imageUrls)],
                    'is_primary' => true
                ]);

                // Create variants with different sizes
                $sizes = ['S', 'M', 'L', 'XL'];
                foreach ($sizes as $size) {
                    ProductVariant::create([
                        'product_id' => $product->id,
                        'sku' => strtoupper(Str::random(8)),
                        'price' => $product->price,
                        'size' => $size,
                        'color' => 'Default',
                        'stock' => rand(5, 20),
                        'is_active' => true
                    ]);
                }
            }
        }
    }
}
