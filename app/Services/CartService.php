<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\ShippingAddress;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CartService
{
    /**
     * Get cart items for current user with products
     *
     * @return \Illuminate\Support\Collection
     */
    public function getCartItems(): Collection
    {
        $user = Auth::user();
        
        if (!$user) {
            Log::error('No authenticated user found when trying to get cart items');
            throw new \Exception('User must be authenticated to access cart');
        }
        
        try {
            $items = Cart::with(['product.images', 'product.variants', 'product.category'])
                ->where('user_id', $user->id)
                ->get();
                
            if ($items->isEmpty()) {
                Log::info('Cart is empty for user:', ['user_id' => $user->id]);
            }

            // Log query dan hasil untuk debugging
            Log::info('Cart Query:', [
                'user_id' => $user->id,
                'query' => Cart::with(['product.images', 'product.variants', 'product.category'])
                    ->where('user_id', $user->id)
                    ->toSql()
            ]);
            
            // Debug log untuk memeriksa struktur data lengkap
            Log::info('Found cart items:', [
                'count' => $items->count(),
                'items' => $items->map(function($item) {
                    return [
                        'id' => $item->id,
                        'product' => [
                            'id' => $item->product->id,
                            'name' => $item->product->name,
                            'images' => $item->product->images->toArray(),
                            'variants' => $item->product->variants->toArray(),
                            'category' => $item->product->category ? [
                                'id' => $item->product->category->id,
                                'name' => $item->product->category->name
                            ] : null
                        ]
                    ];
                })->toArray()
            ]);
                
            return $items;
        } catch (\Exception $e) {
            Log::error('Error getting cart items:', [
                'user_id' => $user->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }

    /**
     * Get shipping addresses for current user
     *
     * @return array
     */
    public function getShippingAddresses(): array
    {
        $user = Auth::user();
        
        if (!$user) {
            Log::error('No authenticated user found when trying to get shipping addresses');
            throw new \Exception('User must be authenticated to access shipping addresses');
        }
        
        try {
            $addresses = ShippingAddress::where('user_id', $user->id)->get();
            $defaultAddress = ShippingAddress::where('user_id', $user->id)
                ->where('is_default', true)
                ->first();

            Log::info('Shipping addresses loaded:', [
                'user_id' => $user->id,
                'addresses_count' => $addresses->count(),
                'has_default' => !is_null($defaultAddress)
            ]);

            return [
                'addresses' => $addresses,
                'default' => $defaultAddress
            ];
        } catch (\Exception $e) {
            Log::error('Error getting shipping addresses:', [
                'user_id' => $user->id,
                'error' => $e->getMessage()
            ]);
            throw $e;
        }
    }

    /**
     * Calculate total amount for cart items
     *
     * @param \Illuminate\Support\Collection $cartItems
     * @return int
     */
    public function calculateTotal(Collection $cartItems): int
    {
        return $cartItems->sum(function ($item) {
            return $item->product->price * $item->quantity;
        });
    }
}
