<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expedition extends Model
{
    use HasFactory;

    protected $table = 'expeditions';

    protected $fillable = [
        'name',
        'code',
        'logo',
        'is_active',
        'base_cost'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'base_cost' => 'decimal:2'
    ];

    public function shippingRates()
    {
        return $this->hasMany(ShippingRate::class);
    }
}
