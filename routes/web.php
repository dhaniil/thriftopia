<?php

// use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\AvatarController;
use App\Models\Banner;
use App\Models\User;
use App\Models\Category;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () { return Inertia::render('HomePage',[ 
'banners' => Banner::where('is_active', true)
    ->select('title', 'description', 'image_path')
    ->get(),

'categories' => Category::where('is_active', true)
    ->whereNotNull('parent_id')
    ->select('name', 'slug', 'image')
    ->get()
]); 

})->name('home');



Route::get('/kategori', function () { return Inertia::render('Categories');
})->name('kategori');

Route::get('/detail', function () { return Inertia::render('DetailProduct');
})->name('detail');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('profile', function () {
        return Inertia::render('Profile');
    })->name('profile');
    Route::post('profile/update', [AvatarController::class, 'updateProfile'])->name('profile.update');
    Route::post('profile/avatar', [AvatarController::class, 'uploadAvatar'])->name('profile.avatar');
    Route::get('cart', function () {
        return Inertia::render('Cart');
    })->name('cart');
});




require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
