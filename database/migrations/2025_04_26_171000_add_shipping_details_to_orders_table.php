<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            // Add shipping details
            $table->decimal('shipping_cost', 10, 2)->default(0)->after('total_amount');
            $table->string('shipping_method')->nullable()->after('shipping_cost');
            $table->string('shipping_service')->nullable()->after('shipping_method');
            
            // Add customer details
            $table->string('customer_name')->nullable();
            $table->string('customer_email')->nullable();
            $table->string('customer_phone')->nullable();

            // Add shipping address details
            $table->string('shipping_address')->nullable();
            $table->string('shipping_city')->nullable();
            $table->string('shipping_province')->nullable();
            $table->string('shipping_postal_code')->nullable();
            $table->string('shipping_country')->default('ID');

            // Add notes
            $table->text('notes')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn([
                'shipping_cost',
                'shipping_method',
                'shipping_service',
                'customer_name',
                'customer_email',
                'customer_phone',
                'shipping_address',
                'shipping_city',
                'shipping_province',
                'shipping_postal_code',
                'shipping_country',
                'notes'
            ]);
        });
    }
};
