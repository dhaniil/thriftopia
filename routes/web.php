<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\AvatarController;
use App\Models\Banner;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('HomePage', [
        'banners' => Banner::all(),
        'categories' => Category::select('name', 'slug', 'image')->get(),
        'products' => Product::select(
            'products.id',
            'products.name',
            'products.price',
            'product_variants.size',
            'product_images.image_path as image'
        )
        ->leftJoin('product_variants', function($join) {
            $join->on('products.id', '=', 'product_variants.product_id')
                ->whereRaw('product_variants.id = (
                    SELECT id FROM product_variants 
                    WHERE product_id = products.id 
                    LIMIT 1
                )');
        })
        ->leftJoin('product_images', function($join) {
            $join->on('products.id', '=', 'product_images.product_id')
                ->where('product_images.is_primary', true)
                ->orWhereRaw('product_images.id = (
                    SELECT id FROM product_images 
                    WHERE product_id = products.id 
                    LIMIT 1
                )');
        })
        ->where('products.is_active', true)
        ->get()
    ]);
})->name('home');

// Avatar routes
Route::get('/avatar', [AvatarController::class, 'show'])->name('avatar.show');

// Auth routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Cart routes
Route::middleware('auth')->prefix('cart')->group(function () {
    Route::get('/', [CartController::class, 'index'])->name('cart.index');
    Route::post('/', [CartController::class, 'store'])->name('cart.store');
    Route::delete('/{cart}', [CartController::class, 'destroy'])->name('cart.destroy');
});

// Payment routes
Route::middleware('auth')->prefix('payment')->group(function () {
    Route::post('/create', [PaymentController::class, 'create'])->name('payment.create');
    Route::post('/notification', [PaymentController::class, 'notification'])->name('payment.notification');
    Route::get('/success', [PaymentController::class, 'success'])->name('payment.success');
    Route::get('/error', [PaymentController::class, 'error'])->name('payment.error');
    Route::get('/pending', [PaymentController::class, 'pending'])->name('payment.pending');
});

require __DIR__.'/auth.php';
