<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Traits\FormatsCartData;
use App\Models\Order;
use App\Models\Payment;
use App\Services\CartService;
use App\Services\MidtransService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PaymentController extends Controller
{
    use FormatsCartData;

    protected MidtransService $midtrans;
    protected CartService $cartService;

    public function __construct(MidtransService $midtrans, CartService $cartService)
    {
        $this->midtrans = $midtrans;
        $this->cartService = $cartService;
    }

    public function create(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return back()->with('error', 'Silakan login terlebih dahulu');
        }

        $cartItems = Cart::whereIn('id', $request->item_ids)->get();
        $shippingData = $this->cartService->getShippingAddresses();
        $defaultAddress = $shippingData['default'];

        if (!$request->has('item_ids') || $cartItems->isEmpty()) {
            return back()->with('error', 'Pilih minimal 1 produk untuk melanjutkan pembelian');
        }

        if (!$defaultAddress) {
            return back()->with('error', 'Silakan tambahkan alamat pengiriman');
        }

        try {
            // Buat order baru
            $order = Order::create([
                'user_id' => $user->id,
                'total_amount' => $cartItems->sum(fn($item) => $item->product->price * $item->quantity),
                'status' => 'pending',
                'shipping_address_id' => $defaultAddress->id,
                'payment_method' => 'midtrans',
                'shipping_status' => 'pending'
            ]);

            // Simpan item order
            foreach ($cartItems as $item) {
                $order->items()->create([
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'price' => $item->product->price
                ]);
            }

            // Buat payment record
            $payment = Payment::create([
                'order_id' => $order->id,
                'gross_amount' => $order->total_amount,
                'status' => 'pending',
                'payment_method' => 'midtrans'
            ]);

            $params = [
                'transaction_details' => [
                    'order_id' => (string) $payment->id,
                    'gross_amount' => (int) $payment->gross_amount
                ],
                'enabled_payments' => ['credit_card', 'gopay', 'shopeepay'],
                'credit_card' => [
                    'secure' => true
                ],
                'customer_details' => [
                    'first_name' => $defaultAddress->name,
                    'email' => $user->email,
                    'phone' => $defaultAddress->phone,
                    'billing_address' => [
                        'first_name' => $defaultAddress->name,
                        'phone' => $defaultAddress->phone,
                        'address' => $defaultAddress->address,
                        'city' => $defaultAddress->city,
                        'postal_code' => $defaultAddress->postal_code,
                        'country_code' => 'IDN'
                    ],
                    'shipping_address' => [
                        'first_name' => $defaultAddress->name,
                        'phone' => $defaultAddress->phone,
                        'address' => $defaultAddress->address,
                        'city' => $defaultAddress->city,
                        'postal_code' => $defaultAddress->postal_code,
                        'country_code' => 'IDN'
                    ]
                ],
                'item_details' => $cartItems->map(function($item) {
                    return [
                        'id' => (string) $item->product->id,
                        'price' => (int) $item->product->price,
                        'quantity' => (int) $item->quantity,
                        'name' => substr($item->product->name, 0, 50)
                    ];
                })->all()
            ];

            Log::info('Memulai transaksi', [
                'order_id' => $payment->id,
                'amount' => $payment->gross_amount
            ]);

            $snapResponse = $this->midtrans->createTransaction($params);
            
            if (!isset($snapResponse['redirect_url'])) {
                throw new \Exception('URL pembayaran tidak tersedia');
            }

            // Cek apakah ini adalah request Inertia
            if ($request->header('X-Inertia')) {
                return Inertia::location($snapResponse['redirect_url']);
            }
            
            // Cek apakah ini adalah request Ajax biasa
            if ($request->wantsJson()) {
                return response()->json(['snapUrl' => $snapResponse['redirect_url']]);
            }

            // Fallback untuk non-ajax requests
            return redirect($snapResponse['redirect_url']);

        } catch (\Exception $e) {
            Log::error('Gagal membuat transaksi', [
                'error' => $e->getMessage()
            ]);

            // Hapus order dan payment jika gagal
            if (isset($payment)) $payment->delete();
            if (isset($order)) $order->delete();

            return back()->with('error', 'Gagal memproses pembayaran: ' . $e->getMessage());
        }
    }

    public function notification(Request $request)
    {
        try {
            $notification = $this->midtrans->parseNotification();
            $payment = Payment::find($notification->order_id);

            if (!$payment) {
                Log::error('Payment tidak ditemukan', [
                    'order_id' => $notification->order_id
                ]);
                return response()->json(['error' => 'Payment tidak ditemukan'], 404);
            }

            // Update payment status
            $payment->update([
                'status' => $notification->transaction_status,
                'payment_type' => $notification->payment_type,
                'paid_at' => now()
            ]);

            $payment->order->update([
                'status' => $notification->transaction_status
            ]);

            // Clear cart if payment is successful
            if (in_array($notification->transaction_status, ['capture', 'settlement'])) {
                Cart::where('user_id', $payment->order->user_id)->delete();
            }
            
            return response()->json(['status' => 'success']);

        } catch (\Exception $e) {
            Log::error('Error notifikasi pembayaran', [
                'error' => $e->getMessage()
            ]);
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function success()
    {
        return Inertia::render('Checkout/Success');
    }

    public function error()
    {
        return Inertia::render('Checkout/Error');
    }

    public function pending()
    {
        return Inertia::render('Checkout/Pending');
    }
}
