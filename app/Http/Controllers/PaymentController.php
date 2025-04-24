<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\Payment;
use App\Services\MidtransService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PaymentController extends Controller
{
    protected $midtrans;

    public function __construct(MidtransService $midtrans)
    {
        $this->midtrans = $midtrans;
    }

    public function create(Request $request)
    {
        $user = Auth::user();
        $cartItems = Cart::with(['product'])
            ->where('user_id', $user->id)
            ->get();

        if ($cartItems->isEmpty()) {
            return response()->json(['error' => 'Cart is empty'], 400);
        }

        $order = Order::create([
            'user_id' => $user->id,
            'total_amount' => $cartItems->sum(function ($item) {
                return $item->product->price * $item->quantity;
            }),
            'status' => 'pending'
        ]);

        foreach ($cartItems as $item) {
            $order->items()->create([
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'price' => $item->product->price
            ]);
        }

        $payment = Payment::create([
            'order_id' => $order->id,
            'amount' => $order->total_amount,
            'status' => 'pending'
        ]);

        $snapToken = $this->midtrans->createTransaction([
            'transaction_details' => [
                'order_id' => $payment->id,
                'gross_amount' => $payment->amount,
            ],
            'customer_details' => [
                'first_name' => $user->name,
                'email' => $user->email,
            ],
        ]);

        return response()->json(['snap_token' => $snapToken]);
    }

    public function notification(Request $request)
    {
        $notification = $this->midtrans->parseNotification();

        $payment = Payment::find($notification->order_id);
        if (!$payment) {
            return response()->json(['error' => 'Payment not found'], 404);
        }

        $payment->update([
            'status' => $notification->transaction_status,
            'payment_type' => $notification->payment_type,
            'paid_at' => now()
        ]);

        $payment->order->update([
            'status' => $notification->transaction_status
        ]);

        if (in_array($notification->transaction_status, ['capture', 'settlement'])) {
            Cart::where('user_id', $payment->order->user_id)->delete();
        }

        return response()->json(['success' => true]);
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
