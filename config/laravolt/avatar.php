<?php

return [
    'driver' => 'gd',

    // Path untuk menyimpan avatar sementara
    'directory' => storage_path('app/public/avatars'),

    // Default size in pixels
    'width' => 100,
    'height' => 100,

    // Font Size
    'fontSize' => 48,

    // Convert initial letter untuk avatar
    'ascii' => true,

    // Fonts yang digunakan
    'fonts' => [
        public_path('fonts/HankenGrotesk-Bold.ttf')
    ],

    // Warna foreground (teks)
    'foreground' => '#FFFFFF',

    // Background colors
    'backgrounds' => [
        '#f44336',
        '#E91E63',
        '#9C27B0',
        '#673AB7',
        '#3F51B5',
        '#2196F3',
        '#03A9F4',
        '#00BCD4',
        '#009688',
        '#4CAF50',
        '#8BC34A',
        '#CDDC39',
        '#FFC107',
        '#FF9800',
        '#FF5722'
    ],

    // Ukuran border dalam pixels
    'border' => [
        'size' => 1,
        'color' => '#ffffff'
    ],

    // Shape: circle, square
    'shape' => 'circle',

    // Cache
    'cache' => [
        'driver' => 'file',
        'folder' => storage_path('app/public/avatar-cache'),
        'expire' => 60 * 60 * 24, // 24 jam
    ]
];
