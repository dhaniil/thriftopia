<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\ProductVariant;
use App\Models\OrderItem;
use Illuminate\Database\Seeder;

class OrderItemSeeder extends Seeder
{
    public function run(): void
    {
        $orders = Order::all();
        $productVariants = ProductVariant::all();

        foreach ($orders as $order) {
            // Add 1-5 items for each order
            $itemCount = rand(1, 5);
            $totalAmount = 0;

            // Randomly select unique variants for this order
            $selectedVariants = $productVariants->random($itemCount);

            foreach ($selectedVariants as $variant) {
                $quantity = rand(1, 3);
                $price = $variant->price;

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $variant->product_id,
                    'product_variant_id' => $variant->id,
                    'quantity' => $quantity,
                    'price' => $price
                ]);

                $totalAmount += ($price * $quantity);
            }

            // Update order total amount
            $order->update([
                'total_amount' => $totalAmount
            ]);

            // Decrease stock for non-cancelled orders
            if ($order->status !== 'cancelled') {
                foreach ($selectedVariants as $variant) {
                    $variant->decrement('stock', $quantity);
                }
            }
        }
    }
}
