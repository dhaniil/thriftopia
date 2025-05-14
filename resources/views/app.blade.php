        <!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- Favicon -->
        <link rel="icon" media="(prefers-color-scheme: light)" type="image/webp" href="/TLogo-b.ico">
        <link rel="icon" media="(prefers-color-scheme: dark)" type="image/png" href="TLogo-w.ico">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/thriftopia/app.tsx'])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia

        <!-- Midtrans Setup -->
        <script>
            window.midtransClientKey = "{{ config('midtrans.client_key') }}";
            window.midtransEnvironment = "{{ config('midtrans.is_production') ? 'production' : 'sandbox' }}";

            var setupInProgress = false;

            function setupMidtrans() {
                if (setupInProgress || window.isMidtransLoaded) {
                    console.log('Midtrans setup already in progress or completed');
                    return Promise.resolve();
                }

                setupInProgress = true;
                console.log('Setting up Midtrans...', {
                    environment: "{{ config('midtrans.is_production') ? 'production' : 'sandbox' }}",
                    hasClientKey: Boolean("{{ config('midtrans.client_key') }}"),
                    url: "{{ config('midtrans.is_production') ? 'https://app.midtrans.com/snap/snap.js' : 'https://app.sandbox.midtrans.com/snap/snap.js' }}"
                });
                return new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.src = "{{ config('midtrans.is_production') 
                        ? 'https://app.midtrans.com/snap/snap.js'
                        : 'https://app.sandbox.midtrans.com/snap/snap.js' }}";
                    script.setAttribute('data-client-key', "{{ config('midtrans.client_key') }}");
                    script.async = true;
                    script.onload = () => {
                        console.log('Midtrans script loaded successfully');
                        window.isMidtransLoaded = true;
                        setupInProgress = false;
                        resolve();
                    };
                    script.onerror = () => {
                        console.error('Failed to load Midtrans script');
                        setupInProgress = false;
                        reject(new Error('Failed to load Midtrans script'));
                    };
                    document.body.appendChild(script);
                });
            }

            document.addEventListener('DOMContentLoaded', function() {
                console.log('DOMContentLoaded - Starting Midtrans setup');
                setupMidtrans().catch(error => {
                    console.error('Midtrans setup error:', error);
                });
            });

            // Backup check in case DOMContentLoaded already fired
            if (document.readyState === 'complete') {
                console.log('Document already loaded - Starting Midtrans setup');
                setupMidtrans().catch(error => {
                    console.error('Midtrans setup error:', error);
                });
            }
        </script>
    </body>
</html>
