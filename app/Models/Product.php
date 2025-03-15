<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'price', 'stock', 'category_id'];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class);
    }

    public function variants(): HasMany
    {
        return $this->hasMany(ProductVariant::class);
    }

    public function attributeValues(): HasMany
    {
        return $this->hasMany(AttributeValue::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    // Helper method untuk mendapatkan gambar utama
    public function getPrimaryImage(): ?string
    {
        $primaryImage = $this->images()->where('is_primary', true)->first();

        if ($primaryImage) {
            return $primaryImage->image_path;
        }

        // Jika tidak ada gambar utama, ambil gambar pertama
        $firstImage = $this->images()->first();

        return $firstImage ? $firstImage->image_path : null;
    }

    // Helper untuk mendapatkan rating rata-rata
    public function getAverageRating(): float
    {
        return $this->reviews()->avg('rating') ?? 0;
    }
}
