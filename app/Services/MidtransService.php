<?php

namespace App\Services;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;

class MidtransService
{
    protected $isProduction;
    protected $serverKey;
    protected $clientKey;

    public function __construct()
    {
        $this->isProduction = Config::get('midtrans.is_production', false);
        $this->serverKey = Config::get('midtrans.server_key');
        $this->clientKey = Config::get('midtrans.client_key');
    }

    public function createTransaction(array $params)
    {
        $baseUrl = $this->isProduction
            ? 'https://app.midtrans.com/snap/v1/transactions'
            : 'https://app.sandbox.midtrans.com/snap/v1/transactions';

        $response = Http::withBasicAuth($this->serverKey, $this->clientKey)
            ->post($baseUrl, [
                'transaction_details' => [
                    'order_id' => $params['order_id'],
                    'gross_amount' => (int)$params['gross_amount']
                ],
                'credit_card' => [
                    'secure' => true
                ]
            ]);

        if ($response->successful()) {
            return $response->json('token');
        }

        throw new \Exception('Failed to create Midtrans transaction: ' . $response->body());
    }

    public function parseNotification()
    {
        $rawBody = file_get_contents('php://input');
        $notification = json_decode($rawBody);

        $signatureKey = hash('sha512', $notification->order_id . $notification->status_code . $notification->gross_amount . $this->serverKey);

        if ($signatureKey !== $notification->signature_key) {
            throw new \Exception('Invalid signature key');
        }

        return $notification;
    }
}
