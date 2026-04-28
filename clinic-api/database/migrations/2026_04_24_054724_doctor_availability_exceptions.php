<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('doctor_availability_exceptions', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('doctor_id');
            $table->date('date');

            $table->enum('type', ['full_day', 'half_day'])->default('full_day');

            $table->enum('half_day_period', ['morning', 'afternoon'])->nullable();

            $table->text('reason')->nullable();

            $table->timestamps();

            // Indexes for fast lookup
            $table->index(['doctor_id', 'date']);

            // Foreign key (adjust table name if needed)
            $table->foreign('doctor_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('doctor_availability_exceptions');
    }
};