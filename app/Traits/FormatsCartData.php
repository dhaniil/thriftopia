<?php

namespace App\Traits;

use Illuminate\Support\Facades\Log;

trait FormatsCartData
{
    /**
     * Format cart data for consistent Inertia response
     *
     * @param \Illuminate\Support\Collection $cartItems
     * @param \Illuminate\Support\Collection $addresses
     * @param \App\Models\ShippingAddress|null $defaultAddress
     * @param string|null $error
     * @param string|null $snapToken
     * @return array
     */
    protected function formatCartData($cartItems, $addresses, $defaultAddress, $error = null, $snapToken = null): array
    {
        Log::debug('Starting cart data formatting', [
            'items_count' => $cartItems->count(),
            'addresses_count' => $addresses->count(),
            'has_default_address' => !is_null($defaultAddress),
        ]);

        $items = $cartItems->map(function($item) {
            Log::debug('Formatting cart item', [
                'item_id' => $item->id,
                'has_product' => !is_null($item->product),
                'has_variant' => !is_null($item->product?->variants?->first()),
            ]);

            return [
                'id' => $item->id,
                'user_id' => $item->user_id,
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'product' => $item->product ? [
                    'id' => $item->product->id,
                    'name' => $item->product->name,
                    'price' => (int)$item->product->price,
                    'image' => $item->product->getPrimaryImage() ?? '/placeholder.jpg',
                    'description' => $item->product->description ?? '',
                    'variant' => $item->product->variants && $item->product->variants->isNotEmpty() ? [
                        'id' => $item->product->variants->first()->id,
                        'size' => $item->product->variants->first()->size ?? '-'
                    ] : null,
                    'brand' => $item->product->category?->name ?? '-'
                ] : null
            ];
        })->toArray();

        $formattedData = [
            'items' => $items,
            'addresses' => $addresses->toArray(),
            'defaultAddress' => $defaultAddress ? $defaultAddress->toArray() : null,
            'error' => $error,
            'snap_token' => $snapToken
        ];

        Log::debug('Cart data formatting complete', [
            'formatted_items_count' => count($formattedData['items']),
            'formatted_addresses_count' => count($formattedData['addresses']),
        ]);

        return $formattedData;
    }
}
