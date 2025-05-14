<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\ShippingAddress;
use App\Services\CartService;
use App\Traits\FormatsCartData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CartController extends Controller
{
    use FormatsCartData;

    protected CartService $cartService;

    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }

    public function index()
    {
        try {
            $items = $this->cartService->getCartItems();
            $shippingData = $this->cartService->getShippingAddresses();
            
            $formattedData = $this->formatCartData($items, $shippingData['addresses'], $shippingData['default']);
        
            Log::info('Raw Cart Data:', [
                'raw_items_count' => $items->count(),
                'raw_items' => $items->toArray(),
                'raw_addresses' => $shippingData['addresses']->toArray(),
            ]);

            Log::info('Formatted Cart Data:', [
                'formatted_items_count' => count($formattedData['items']),
                'formatted_items' => $formattedData['items'],
                'addresses_count' => count($formattedData['addresses']),
            ]);

            Log::info('Debug user:', [
                'user_id' => Auth::id(),
                'is_authenticated' => Auth::check(),
            ]);

            return Inertia::render('Cart', $formattedData);
            
        } catch (\Exception $e) {
            Log::error('Error in cart page:', [
                'error' => $e->getMessage(),
                'user_id' => Auth::id(),
                'is_authenticated' => Auth::check()
            ]);

            return Inertia::render('Cart', [
                'items' => [],
                'addresses' => [],
                'defaultAddress' => null,
                'error' => 'Terjadi kesalahan saat memuat keranjang. Silakan coba lagi.'
            ]);
        }
    }

    public function addAddress(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:500',
            'city' => 'required|string|max:100',
            'postal_code' => 'required|string|max:10'
        ]);

        $address = ShippingAddress::create(array_merge(
            $validated,
            ['user_id' => Auth::id()]
        ));

        if (!Auth::user()->defaultShippingAddress) {
            $address->update(['is_default' => true]);
        }

        return back();
    }

    public function setDefaultAddress($id)
    {
        $user = Auth::id();
        
        ShippingAddress::where('user_id', $user)
            ->update(['is_default' => false]);
        
        ShippingAddress::where('id', $id)
            ->where('user_id', $user)
            ->update(['is_default' => true]);

        return back();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $cart = Cart::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'product_id' => $validated['product_id']
            ],
            [
                'quantity' => $validated['quantity']
            ]
        );

        return back();
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        $cart = Cart::where('user_id', Auth::id())
            ->findOrFail($id);

        $cart->update([
            'quantity' => $validated['quantity']
        ]);

        return back();
    }

    public function destroy($id)
    {
        $cart = Cart::where('user_id', Auth::id())
            ->findOrFail($id);

        $cart->delete();

        return back();
    }
}
