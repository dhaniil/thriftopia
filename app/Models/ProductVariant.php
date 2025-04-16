<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProductVariant extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'size',
        'color',
        'stock',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function stockHistories(): HasMany
    {
        return $this->hasMany(StockHistory::class);
    }

    protected static function boot()
    {
        parent::boot();

        // Record initial stock when variant is created
        static::created(function (ProductVariant $variant) {
            StockHistory::record($variant, 'initial', $variant->stock, 'Initial stock set on creation');
        });

        // Record stock changes when variant is updated
        static::updated(function (ProductVariant $variant) {
            if ($variant->isDirty('stock')) {
                StockHistory::record(
                    $variant,
                    'adjustment',
                    $variant->stock,
                    'Stock updated from admin panel'
                );
            }
        });
    }

    public function adjustStock(int $newStock, string $type = 'adjustment', ?string $notes = null): void
    {
        $this->update(['stock' => $newStock]);
        StockHistory::record($this, $type, $newStock, $notes);
    }
}
