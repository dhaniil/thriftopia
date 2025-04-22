<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'payment_method',
        'payment_type',
        'va_number',
        'gross_amount',
        'transaction_id',
        'snap_token',
        'redirect_url',
        'pdf_url',
        'status',
        'status_code',
        'payload_response',
        'paid_at',
        'expired_at'
    ];

    protected $casts = [
        'gross_amount' => 'decimal:2',
        'payload_response' => 'json',
        'paid_at' => 'datetime',
        'expired_at' => 'datetime'
    ];

    const STATUS_PENDING = 'pending';
    const STATUS_SUCCESS = 'success';
    const STATUS_FAILED = 'failed';
    const STATUS_EXPIRED = 'expired';
    const STATUS_CANCELED = 'canceled';

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
