<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [ProductController::class, 'index'])->name('home');

Route::middleware(['auth'])->group(function () {
    // Cart Routes
    Route::get('/cart', [CartController::class, 'index'])->name('cart');
    Route::post('/cart', [CartController::class, 'store']);
    Route::patch('/cart/{id}', [CartController::class, 'update']);
    Route::delete('/cart/{id}', [CartController::class, 'destroy']);

    // Payment Routes
    Route::post('/payment/create', [PaymentController::class, 'create'])->name('payment.create');
    Route::get('/payment/success', [PaymentController::class, 'success'])->name('payment.success');
    Route::get('/payment/error', [PaymentController::class, 'error'])->name('payment.error');
    Route::get('/payment/pending', [PaymentController::class, 'pending'])->name('payment.pending');
});

// Midtrans Notification Handler
Route::post('/payment/notification', [PaymentController::class, 'notification'])
    ->name('payment.notification');

require __DIR__.'/auth.php';
