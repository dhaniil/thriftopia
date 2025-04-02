<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('variant_values', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_variant_id')->constrained()->onDelete('cascade');
            $table->foreignId('attribute_id')->constrained()->onDelete('cascade');
            $table->string('value');
            $table->timestamps();
            
            // Mencegah duplikasi nilai atribut untuk varian yang sama
            $table->unique(['product_variant_id', 'attribute_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('variant_values');
    }
};
