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
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();

            $table->foreignId('clinic_id')
                ->constrained()
                ->onDelete('cascade');

            $table->foreignId('patient_id')
                ->constrained()
                ->onDelete('cascade');

            $table->foreignId('doctor_id')
                ->constrained('users')
                ->onDelete('cascade');

            $table->foreignId('created_by')
                ->constrained('users')
                ->onDelete('cascade');

            $table->string('title')->nullable();
            $table->text('description')->nullable();

            $table->date('appointment_date');
            $table->time('start_time')->nullable();
            $table->time('end_time')->nullable();

            $table->string('status')->default('pending');
            // pending | confirmed | completed | cancelled

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
