<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StockHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_variant_id',
        'type',
        'old_stock',
        'new_stock',
        'difference',
        'notes',
        'created_by'
    ];

    public function productVariant(): BelongsTo
    {
        return $this->belongsTo(ProductVariant::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public static function record(
        ProductVariant $variant,
        string $type,
        int $newStock,
        ?string $notes = null
    ): self {
        $oldStock = $variant->stock;
        $difference = $newStock - $oldStock;

        return self::create([
            'product_variant_id' => $variant->id,
            'type' => $type,
            'old_stock' => $oldStock,
            'new_stock' => $newStock,
            'difference' => $difference,
            'notes' => $notes,
            'created_by' => auth()->id()
        ]);
    }
}
