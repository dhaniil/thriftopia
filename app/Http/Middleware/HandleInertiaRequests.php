<?php

namespace App\Http\Middleware;

use App\Models\Cart;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\Auth;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Defines the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
            ],
            'cart' => function () {
                if (Auth::check()) {
                    return [
                        'items' => Cart::with(['product.images', 'product.variants'])
                            ->where('user_id', Auth::id())
                            ->get()
                            ->map(function ($cart) {
                                return [
                                    'id' => $cart->id,
                                    'quantity' => $cart->quantity,
                                    'product' => [
                                        'id' => $cart->product->id,
                                        'name' => $cart->product->name,
                                        'price' => $cart->product->price,
                                        'image' => $cart->product->images->where('is_primary', true)->first()?->image_path
                                    ]
                                ];
                            }),
                        'count' => Cart::where('user_id', Auth::id())->sum('quantity')
                    ];
                }
                return ['items' => [], 'count' => 0];
            },
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
        ]);
    }
}
