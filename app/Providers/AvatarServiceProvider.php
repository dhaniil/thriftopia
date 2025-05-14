<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Laravolt\Avatar\Avatar;

class AvatarServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->singleton(Avatar::class, function () {
            return new Avatar(config('laravolt.avatar'));
        });

        $this->app->alias(Avatar::class, 'avatar');
    }

    public function boot()
    {
        // Ensure avatar storage directory exists
        $directory = storage_path('app/public/avatars');
        if (!file_exists($directory)) {
            mkdir($directory, 0755, true);
        }

        // Ensure avatar cache directory exists
        $cacheDir = storage_path('app/public/avatar-cache');
        if (!file_exists($cacheDir)) {
            mkdir($cacheDir, 0755, true);
        }

        // Create symlink if it doesn't exist
        $this->publishes([
            storage_path('app/public') => public_path('storage')
        ], 'public');
    }
}
