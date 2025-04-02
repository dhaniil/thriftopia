<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\User;
use App\Models\ShippingAddress;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    private $paymentMethods = [
        'bank_transfer',
        'e_wallet',
        'cod'
    ];

    private $statuses = [
        'pending',
        'processing',
        'shipped',
        'delivered',
        'cancelled'
    ];

    private $shippingStatuses = [
        'pending' => 'pending',
        'processing' => 'processing',
        'shipped' => 'in_transit',
        'delivered' => 'delivered',
        'cancelled' => 'cancelled'
    ];

    public function run(): void
    {
        $users = User::all();

        foreach ($users as $user) {
            // Create 1-5 orders for each user
            $orderCount = rand(1, 5);

            for ($i = 0; $i < $orderCount; $i++) {
                $status = $this->statuses[array_rand($this->statuses)];
                $shippingAddress = ShippingAddress::where('user_id', $user->id)->first();

                if ($shippingAddress) {
                    Order::create([
                        'user_id' => $user->id,
                        'total_amount' => 0, // Will be updated by OrderItemSeeder
                        'status' => $status,
                        'shipping_status' => $this->shippingStatuses[$status],
                        'tracking_number' => $status !== 'pending' ? 'TRK' . str_pad(rand(1, 999999), 6, '0', STR_PAD_LEFT) : null,
                        'shipping_address_id' => $shippingAddress->id,
                        'payment_method' => $this->paymentMethods[array_rand($this->paymentMethods)],
                    ]);
                }
            }
        }
    }
}
