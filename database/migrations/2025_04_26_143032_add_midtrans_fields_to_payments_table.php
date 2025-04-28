<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            $table->string('midtrans_order_id')->nullable()->after('order_id');
            $table->string('transaction_status')->nullable()->after('status');
            $table->string('fraud_status')->nullable();
            $table->renameColumn('payload_response', 'raw_response');
        });
    }

    public function down(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            $table->dropColumn([
                'midtrans_order_id',
                'transaction_status',
                'fraud_status'
            ]);
            $table->renameColumn('raw_response', 'payload_response');
        });
    }
};
