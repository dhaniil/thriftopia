<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('product_variants', function (Blueprint $table) {
            // Drop existing columns that will be handled by attribute values
            // $table->dropColumn(['size', 'color']);
            
            // Add new columns
            $table->string('sku')->unique()->after('product_id');
            $table->decimal('price', 12, 2)->after('sku');
            $table->string('image')->nullable()->after('price');
            $table->boolean('is_active')->default(true)->after('stock');
        });
    }

    public function down(): void
    {
        Schema::table('product_variants', function (Blueprint $table) {
            $table->dropColumn(['sku', 'price', 'image', 'is_active']);
            $table->string('size')->nullable();
            $table->string('color')->nullable();
        });
    }
};
