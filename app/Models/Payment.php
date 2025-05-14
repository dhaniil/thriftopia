<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    protected $fillable = [
        'order_id',
        'gross_amount',
        'status',
        'payment_type',
        'payment_method',
        'transaction_id',
        'snap_token',
        'redirect_url',
        'pdf_url',
        'status_code',
        'payload_response',
        'paid_at',
        'expired_at'
    ];

    protected $casts = [
        'gross_amount' => 'decimal:2',
        'paid_at' => 'datetime',
        'expired_at' => 'datetime',
        'payload_response' => 'json'
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}
