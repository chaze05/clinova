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
        Schema::create('clinic_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('clinic_id')->constrained()->cascadeOnDelete();

            // 📅 Scheduling
            $table->boolean('allow_online_booking')->default(true);
            $table->integer('appointment_slot_duration')->default(30);

            // 🔔 Notifications
            $table->boolean('enable_email_notifications')->default(true);
            $table->boolean('enable_sms_notifications')->default(false);

            // 📋 Business rules
            $table->boolean('auto_approve_appointments')->default(false);
            $table->boolean('allow_walk_in')->default(true);

            // 🌍 System
            $table->string('timezone')->default('Asia/Manila');

            // 🎨 THEME SETTINGS
            $table->string('theme_color')->default('blue'); 
            // options: blue | green | purple

            $table->string('template')->default('modern'); 
            // options: modern | minimal | medical | pro
            $table->integer('max_appointments_per_day')->default(20);
            
            $table->string('layout')->default('template_a'); 
            // options: template_a | template_b | template_c

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clinic_settinggs');
    }
};
