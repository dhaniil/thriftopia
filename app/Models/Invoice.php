<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_number',
        'invoice_date',
        'order_id',
        'payment_type',
        'reference',
        'item_details',
        'customer_details',
        'subtotal',
        'shipping_cost',
        'tax_amount',
        'discount_amount',
        'total_amount',
        'vat',
        'due_date',
        'status',
        'notes',
        'paid_at'
    ];

    protected $casts = [
        'invoice_date' => 'datetime',
        'item_details' => 'json',
        'customer_details' => 'json',
        'subtotal' => 'decimal:2',
        'shipping_cost' => 'decimal:2',
        'tax_amount' => 'decimal:2',
        'discount_amount' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'vat' => 'decimal:2',
        'due_date' => 'datetime',
        'paid_at' => 'datetime'
    ];

    const STATUS_PENDING = 'pending';
    const STATUS_PAID = 'paid';
    const STATUS_CANCELLED = 'cancelled';
    const STATUS_REFUNDED = 'refunded';

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
