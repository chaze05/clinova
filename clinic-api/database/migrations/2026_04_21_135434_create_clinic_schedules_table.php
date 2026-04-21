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
        Schema::create('clinic_schedules', function (Blueprint $table) {
            $table->id();

            $table->foreignId('clinic_id')
                ->constrained()
                ->onDelete('cascade');

            // TYPE OF BLOCK
            $table->string('type');
            // full_day_off | half_day | custom_block

            // DATE RANGE
            $table->date('date');

            $table->time('start_time')->nullable();
            $table->time('end_time')->nullable();

            $table->text('reason')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clinic_schedules');
    }
};
