<?php

namespace Database\Seeders;

use App\Models\Attribute;
use App\Models\ProductVariant;
use App\Models\VariantValue;
use Illuminate\Database\Seeder;

class VariantValueSeeder extends Seeder
{
    private $conditions = ['New with tag', '9/10', '8/10', '7/10'];
    private $materials = [
        'Jaket' => ['Denim', 'Cotton', 'Wool', 'Leather'],
        'Sweater' => ['Cotton', 'Wool', 'Fleece', 'Polyester'],
        'Kemeja' => ['Cotton', 'Linen', 'Denim', 'Flannel'],
        'Celana Panjang' => ['Denim', 'Cotton', 'Wool', 'Corduroy'],
        'Casual' => ['Canvas', 'Leather', 'Suede', 'Mesh'], // For shoes
        'Tote Bag' => ['Canvas', 'Leather', 'Nylon'],
        'Backpack' => ['Canvas', 'Nylon', 'Polyester'],
        'Baseball Cap' => ['Cotton', 'Wool', 'Polyester']
    ];
    
    private $colors = [
        'Black', 'Navy', 'Brown', 'Cream', 'White', 
        'Red', 'Blue', 'Green', 'Grey', 'Beige'
    ];

    private $brands = [
        'Jaket' => ['Levi\'s', 'Lee', 'Wrangler', 'Carhartt'],
        'Sweater' => ['Champion', 'Ralph Lauren', 'Nike', 'Tommy Hilfiger'],
        'Kemeja' => ['Ralph Lauren', 'Tommy Hilfiger', 'Brooks Brothers', 'Lacoste'],
        'Celana Panjang' => ['Levi\'s', 'Lee', 'Dickies', 'Carhartt'],
        'Casual' => ['Nike', 'Adidas', 'Converse', 'Vans', 'New Balance'],
        'Tote Bag' => ['Coach', 'Tommy Hilfiger', 'Ralph Lauren'],
        'Backpack' => ['Jansport', 'Eastpak', 'Ralph Lauren'],
        'Baseball Cap' => ['New Era', 'Nike', 'Adidas', 'Ralph Lauren']
    ];

    private $eras = ['70s', '80s', '90s', '00s'];

    public function run(): void
    {
        $attributes = Attribute::all()->keyBy('name');
        $variants = ProductVariant::with('product.category')->get();

        foreach ($variants as $variant) {
            $category = $variant->product->category->name;
            
            // Extract size from SKU
            preg_match('/-([^-]+)-\d{3}$/', $variant->sku, $matches);
            $size = $matches[1];

            // Add size attribute
            $this->createVariantValue($variant->id, $attributes['Ukuran']->id, $size);

            // Add color attribute
            $this->createVariantValue($variant->id, $attributes['Warna']->id, 
                $this->colors[array_rand($this->colors)]);

            // Add condition attribute
            $this->createVariantValue($variant->id, $attributes['Kondisi']->id, 
                $this->conditions[array_rand($this->conditions)]);

            // Add material attribute if available for category
            if (isset($this->materials[$category])) {
                $this->createVariantValue($variant->id, $attributes['Material']->id, 
                    $this->materials[$category][array_rand($this->materials[$category])]);
            }

            // Add brand attribute if available for category
            if (isset($this->brands[$category])) {
                $this->createVariantValue($variant->id, $attributes['Brand']->id, 
                    $this->brands[$category][array_rand($this->brands[$category])]);
            }

            // Add era attribute
            $this->createVariantValue($variant->id, $attributes['Era']->id, 
                $this->eras[array_rand($this->eras)]);

            // Add gender attribute based on product name and category
            $gender = $this->determineGender($variant->product->name, $category);
            $this->createVariantValue($variant->id, $attributes['Jenis Kelamin']->id, $gender);
        }
    }

    private function createVariantValue($variantId, $attributeId, $value): void
    {
        VariantValue::create([
            'product_variant_id' => $variantId,
            'attribute_id' => $attributeId,
            'value' => $value
        ]);
    }

    private function determineGender($productName, $category): string
    {
        $femaleKeywords = ['dress', 'skirt', 'women'];
        foreach ($femaleKeywords as $keyword) {
            if (stripos($productName, $keyword) !== false) {
                return 'Women';
            }
        }

        $maleKeywords = ['men', 'boy'];
        foreach ($maleKeywords as $keyword) {
            if (stripos($productName, $keyword) !== false) {
                return 'Men';
            }
        }

        return 'Unisex';
    }
}
