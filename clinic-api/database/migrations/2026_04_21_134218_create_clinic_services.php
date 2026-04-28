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
        Schema::create('clinic_service', function (Blueprint $table) {
            $table->id();

            $table->foreignId('clinic_id')->constrained()->onDelete('cascade');
            $table->foreignId('service_id')->constrained()->onDelete('cascade');

            $table->decimal('price', 10, 2)->default(0);
            $table->integer('duration')->default(30); // minutes
            $table->boolean('is_active')->default(true);

            $table->timestamps();

            $table->unique(['clinic_id', 'service_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clinic_services');
    }
};
