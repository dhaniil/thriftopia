<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShippingRate extends Model
{
    use HasFactory;

    protected $fillable = [
        'expedition_id',
        'origin',
        'destination',
        'estimated_days'
    ];

    public function expedition()
    {
        return $this->belongsTo(Expedition::class);
    }
}
