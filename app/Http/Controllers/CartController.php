<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        $cartItems = $this->getFormattedCartItems();

        return Inertia::render('Cart', [
            'cartItems' => $cartItems,
            'auth' => [
                'user' => Auth::user()
            ]
        ]);
    }

    public function getCartItems()
    {
        $cartItems = $this->getFormattedCartItems();
        
        return response()->json([
            'cartItems' => $cartItems,
            'cartCount' => $cartItems->sum('quantity')
        ]);
    }

    public function addToCart(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $cart = Cart::where('user_id', Auth::id())
            ->where('product_id', $validated['product_id'])
            ->first();

        if ($cart) {
            $cart->update([
                'quantity' => $cart->quantity + $validated['quantity']
            ]);
        } else {
            Cart::create([
                'user_id' => Auth::id(),
                'product_id' => $validated['product_id'],
                'quantity' => $validated['quantity']
            ]);
        }

        return $this->responseWithCartData('Product added to cart');
    }

    public function updateQuantity(Request $request, Cart $cart)
    {
        if ($cart->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        $cart->update([
            'quantity' => $validated['quantity']
        ]);

        return $this->responseWithCartData('Quantity updated');
    }

    public function removeFromCart(Cart $cart)
    {
        if ($cart->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $cart->delete();

        return $this->responseWithCartData('Item removed from cart');
    }

    protected function getFormattedCartItems()
    {
        return Cart::with(['product.images'])
            ->where('user_id', Auth::id())
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'product_id' => $item->product_id,
                    'name' => $item->product->name,
                    'price' => $item->product->price,
                    'quantity' => $item->quantity,
                    'image' => $item->product->getPrimaryImage(),
                    'total' => $item->getTotalPrice()
                ];
            });
    }

    protected function responseWithCartData($message)
    {
        $cartItems = $this->getFormattedCartItems();

        if (request()->wantsJson()) {
            return response()->json([
                'message' => $message,
                'cartItems' => $cartItems,
                'cartCount' => $cartItems->sum('quantity')
            ]);
        }

        return back()->with([
            'message' => $message,
            'cartItems' => $cartItems
        ]);
    }
}
