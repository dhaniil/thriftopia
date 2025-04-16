<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('shipping_addresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('phone', 20);
            $table->text('address');
            $table->string('city', 100);
            $table->string('postal_code', 10);
            $table->boolean('is_default')->default(false);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('shipping_addresses');
    }
};
