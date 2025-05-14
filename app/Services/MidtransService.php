<?php

namespace App\Services;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MidtransService
{
    protected $isProduction;
    protected $serverKey;
    protected $clientKey;
    protected $isDebug;

    public function __construct()
    {
        $this->isProduction = Config::get('midtrans.is_production', false);
        $this->serverKey = Config::get('midtrans.server_key');
        $this->clientKey = Config::get('midtrans.client_key');
        $this->isDebug = Config::get('midtrans.is_debug', true);
    }

    private function verifyServerKey(): void
    {
        if (empty($this->serverKey)) {
            Log::error('Midtrans server key not configured');
            throw new \Exception('Midtrans server key is not configured');
        }

        if (!preg_match('/^(SB-Mid-server-|Mid-server-)/', $this->serverKey)) {
            Log::error('Invalid Midtrans server key format');
            throw new \Exception('Invalid Midtrans server key format');
        }

        if ($this->isProduction && str_starts_with($this->serverKey, 'SB-')) {
            Log::error('Sandbox key used in production mode');
            throw new \Exception('Cannot use sandbox key in production mode');
        }

        if (!$this->isProduction && !str_starts_with($this->serverKey, 'SB-')) {
            Log::error('Production key used in sandbox mode');
            throw new \Exception('Cannot use production key in sandbox mode');
        }
    }

    private function validateParams(array $params): void
    {
        if (!isset($params['transaction_details'])) {
            throw new \Exception('Missing transaction_details');
        }

        $required = ['order_id', 'gross_amount'];
        foreach ($required as $field) {
            if (!isset($params['transaction_details'][$field])) {
                throw new \Exception("Missing required field: {$field}");
            }
        }

        if (!is_string($params['transaction_details']['order_id'])) {
            throw new \Exception('order_id must be a string');
        }

        if (!is_int($params['transaction_details']['gross_amount'])) {
            throw new \Exception('gross_amount must be an integer');
        }
    }

    private function getSnapUrl(): string
    {
        return $this->isProduction
            ? 'https://app.midtrans.com/snap/v1/transactions'
            : 'https://app.sandbox.midtrans.com/snap/v1/transactions';
    }

    public function createTransaction(array $params)
    {
        try {
            // Verify configuration
            $this->verifyServerKey();

            // Validate parameters
            $this->validateParams($params);

            // Log transaction attempt
            Log::info('Memulai transaksi Midtrans', [
                'order_id' => $params['transaction_details']['order_id'],
                'amount' => $params['transaction_details']['gross_amount'],
                'customer' => $params['customer_details']['first_name'] ?? 'N/A'
            ]);

            // Make API request
            $response = Http::withBasicAuth($this->serverKey, '')
                ->withHeaders([
                    'Accept' => 'application/json',
                    'Content-Type' => 'application/json'
                ])
                ->post($this->getSnapUrl(), $params);

            // Handle non-successful response
            if (!$response->successful()) {
                Log::error('Midtrans API error', [
                    'status' => $response->status(),
                    'error' => $response->body()
                ]);
                throw new \Exception('Gagal membuat transaksi Midtrans');
            }

            $result = $response->json();

            // Handle Midtrans error messages
            if (isset($result['error_messages'])) {
                $errorMessage = implode(', ', $result['error_messages']);
                Log::error('Midtrans validation error', [
                    'errors' => $result['error_messages']
                ]);
                throw new \Exception("Error Midtrans: {$errorMessage}");
            }

            // Generate redirect URL
            $redirectUrl = $this->isProduction
                ? "https://app.midtrans.com/snap/v2/vtweb/{$result['token']}"
                : "https://app.sandbox.midtrans.com/snap/v2/vtweb/{$result['token']}";

            // Log success
            Log::info('Transaksi berhasil dibuat', [
                'order_id' => $params['transaction_details']['order_id'],
                'redirect_url' => $redirectUrl
            ]);

            return [
                'token' => $result['token'],
                'redirect_url' => $redirectUrl
            ];

        } catch (\Exception $e) {
            Log::error('Gagal membuat transaksi', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }

    public function parseNotification()
    {
        try {
            $rawBody = file_get_contents('php://input');
            $notification = json_decode($rawBody);

            if (!$notification) {
                throw new \Exception('Notifikasi tidak valid');
            }

            $required = ['order_id', 'status_code', 'gross_amount', 'signature_key'];
            foreach ($required as $field) {
                if (!property_exists($notification, $field)) {
                    throw new \Exception("Field yang diperlukan tidak ada: {$field}");
                }
            }

            // Verify signature
            $signatureKey = hash('sha512', 
                $notification->order_id . 
                $notification->status_code . 
                $notification->gross_amount . 
                $this->serverKey
            );

            if ($signatureKey !== $notification->signature_key) {
                Log::error('Signature key tidak valid', [
                    'order_id' => $notification->order_id
                ]);
                throw new \Exception('Signature key tidak valid');
            }

            Log::info('Notifikasi pembayaran diterima', [
                'order_id' => $notification->order_id,
                'status' => $notification->transaction_status ?? 'N/A'
            ]);

            return $notification;

        } catch (\Exception $e) {
            Log::error('Error memproses notifikasi pembayaran', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }
}
