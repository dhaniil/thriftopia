<?php

return [
    'is_production' => env('MIDTRANS_IS_PRODUCTION', false),
    'server_key' => env('MIDTRANS_SERVER_KEY', ''),
    'client_key' => env('MIDTRANS_CLIENT_KEY', ''),
    'is_debug' => env('MIDTRANS_IS_DEBUG', true), // Untuk logging
];
