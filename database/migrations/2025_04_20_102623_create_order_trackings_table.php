<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('order_trackings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->foreignId('expedition_id')->nullable()->constrained()->onDelete('set null');
            $table->string('tracking_number')->nullable();
            $table->string('status'); // processing, shipped, in_transit, delivered, failed
            $table->text('status_description')->nullable();
            $table->string('carrier_name')->nullable();
            $table->json('tracking_details')->nullable(); // Menyimpan riwayat tracking
            $table->timestamp('shipped_at')->nullable();
            $table->timestamp('delivered_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_trackings');
    }
};
