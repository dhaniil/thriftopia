<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            // 1. Users harus pertama karena dibutuhkan oleh seeder lain
            UserSeeder::class,

            // 2. Categories dan Attributes (independent)
            CategorySeeder::class,
            AttributeSeeder::class,

            // 3. Products dan variannya
            ProductSeeder::class,
            ProductVariantSeeder::class,
            VariantValueSeeder::class,
            ProductImageSeeder::class,

            // 4. Shipping addresses untuk users
            ShippingAddressSeeder::class,

            // 5. Orders dan items
            OrderSeeder::class,
            OrderItemSeeder::class,

            // 6. Reviews (membutuhkan orders yang sudah delivered)
            ReviewSeeder::class,
        ]);
    }
}
