<?php

// use App\Http\Controllers\LandingPageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

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

Route::get('/auth/google', function () {
    return Socialite::driver('google')->redirect();
})->name('google.login');

Route::get('/auth/google/callback', function () {
    $googleUser = Socialite::driver('google')->user();
    $user = User::where('email', $googleUser->getEmail())->first();

    if(!$user){
        $user = User::create([
            'name' => $googleUser->getName(),
            'email' => $googleUser->getEmail(),
            'google_id' => $googleUser->getId(),
        ]);
    }

    Auth::login($user);
    return redirect('/');
});



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
