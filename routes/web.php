<?php

// use App\Http\Controllers\LandingPageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('HomePage');
})->name('home');

Route::get('/kategori', function () {
    return Inertia::render('Categories');
})->name('kategori');

Route::get('/detail', function () {
    return Inertia::render('DetailProduct');
})->name('detail');


Route::middleware(['auth', 'verified'])->group(function () {
    // Route::get('dashboard', function () {
    //     return Inertia::render('Dashboard');
    // })->name('dashboard');
    Route::get('profile', function () {
        return Inertia::render('Profile');
    })->name('profile');
    Route::get('cart', function () {
        return Inertia::render('Cart');
    })->name('cart');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
