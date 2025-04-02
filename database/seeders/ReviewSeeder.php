<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Review;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    private $comments = [
        'Barang sesuai deskripsi, kondisi masih bagus.',
        'Pengiriman cepat, packing aman. Barang original.',
        'Kualitas barang vintage sangat baik, masih layak pakai.',
        'Barang sesuai foto, ukuran pas.',
        'Harga worth it untuk barang second branded.',
        'Penjual ramah, fast response. Barang oke.',
        'Kondisi 9/10, masih sangat bagus untuk barang thrift.',
        'Barang original dan masih bagus banget.',
        'Pengiriman agak lama, tapi barang sesuai ekspektasi.',
        'Size chart akurat, barang sesuai deskripsi.'
    ];

    public function run(): void
    {
        $completedOrders = Order::where('status', 'delivered')->get();

        foreach ($completedOrders as $order) {
            $orderItems = OrderItem::where('order_id', $order->id)->get();

            foreach ($orderItems as $item) {
                // 70% chance to leave a review
                if (rand(1, 100) <= 70) {
                    Review::create([
                        'user_id' => $order->user_id,
                        'product_id' => $item->product_id,
                        'rating' => rand(3, 5), // Bias towards positive ratings
                        'comment' => $this->comments[array_rand($this->comments)]
                    ]);
                }
            }
        }
    }
}
