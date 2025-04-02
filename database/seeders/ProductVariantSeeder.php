<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Database\Seeder;

class ProductVariantSeeder extends Seeder
{
    public function run(): void
    {
        $products = Product::all();

        foreach ($products as $product) {
            $category = $product->category;
            $basePrice = $this->getBasePrice($category->name);
            
            // Generate variants based on category
            switch ($category->name) {
                case 'Jaket':
                case 'Sweater':
                case 'Kemeja':
                    $sizes = ['S', 'M', 'L', 'XL'];
                    foreach ($sizes as $size) {
                        $sku = $this->generateSku($product, $size);
                        ProductVariant::create([
                            'product_id' => $product->id,
                            'sku' => $sku,
                            'price' => $basePrice + (array_search($size, $sizes) * 10000),
                            'stock' => rand(1, 5),
                            'is_active' => true
                        ]);
                    }
                    break;

                case 'Celana Panjang':
                    $sizes = ['30', '32', '34', '36'];
                    foreach ($sizes as $size) {
                        $sku = $this->generateSku($product, $size);
                        ProductVariant::create([
                            'product_id' => $product->id,
                            'sku' => $sku,
                            'price' => $basePrice + (array_search($size, $sizes) * 15000),
                            'stock' => rand(1, 5),
                            'is_active' => true
                        ]);
                    }
                    break;

                case 'Casual': // For shoes
                    $sizes = ['40', '41', '42', '43', '44'];
                    foreach ($sizes as $size) {
                        $sku = $this->generateSku($product, $size);
                        ProductVariant::create([
                            'product_id' => $product->id,
                            'sku' => $sku,
                            'price' => $basePrice + (array_search($size, $sizes) * 20000),
                            'stock' => rand(1, 3),
                            'is_active' => true
                        ]);
                    }
                    break;

                default: // For accessories like bags, caps
                    $sku = $this->generateSku($product, 'OS'); // One Size
                    ProductVariant::create([
                        'product_id' => $product->id,
                        'sku' => $sku,
                        'price' => $basePrice,
                        'stock' => rand(1, 5),
                        'is_active' => true
                    ]);
                    break;
            }
        }
    }

    private function generateSku($product, $size): string
    {
        $prefix = strtoupper(substr(str_replace(' ', '', $product->name), 0, 3));
        $categoryPrefix = strtoupper(substr($product->category->name, 0, 2));
        $randomNum = str_pad(rand(1, 999), 3, '0', STR_PAD_LEFT);
        
        return "{$prefix}-{$categoryPrefix}-{$size}-{$randomNum}";
    }

    private function getBasePrice($category): float
    {
        return match($category) {
            'Jaket' => 250000,
            'Sweater' => 200000,
            'Kemeja' => 150000,
            'Celana Panjang' => 180000,
            'Casual' => 400000, // For shoes
            'Tote Bag', 'Backpack' => 300000,
            'Baseball Cap' => 100000,
            default => 150000,
        };
    }
}
