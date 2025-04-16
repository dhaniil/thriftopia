<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('product_variants', function (Blueprint $table) {
            // Drop columns that are now handled by attributes or moved to products table
            $table->dropColumn(['price', 'sku', 'image']);
        });
    }

    public function down(): void
    {
        Schema::table('product_variants', function (Blueprint $table) {
            // Add back the columns if needed to rollback
            $table->string('sku')->nullable();
            $table->decimal('price', 12, 2)->nullable();
            $table->string('image')->nullable();
        });
    }
};
