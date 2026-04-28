<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('clinic_details', function (Blueprint $table) {
        $table->id();
        $table->foreignId('clinic_id')->constrained()->cascadeOnDelete();

        // 🏷️ BRANDING
        $table->string('description')->nullable();
        $table->string('address')->nullable();
        $table->string('contact_email')->nullable();
        $table->string('contact_phone')->nullable();
        $table->string('logo')->nullable();

        $table->string('primary_color')->default('#16a34a');
        $table->string('secondary_color')->default('#0f172a');
        $table->string('theme')->default('blue');
        $table->string('template_key')->default('mdoern');

        // 🧾 BOOKING SETTINGS
        $table->boolean('booking_enabled')->default(true);
        $table->boolean('auto_confirm_appointments')->default(false);
        $table->integer('max_appointments_per_slot')->default(1);
        $table->integer('buffer_minutes')->default(10);

        // 🕒 BUSINESS HOURS (simple JSON for now)
        $table->json('business_hours')->nullable();

        // 📩 NOTIFICATIONS
        $table->boolean('email_notifications')->default(true);
        $table->boolean('sms_notifications')->default(false);

        $table->boolean('notify_patient_on_booking')->default(true);
        $table->boolean('notify_clinic_on_booking')->default(true);

        $table->boolean('notify_before_appointment')->default(true);
        $table->integer('reminder_hours_before')->default(24);

        // ⚙️ CLINIC BEHAVIOR
        $table->boolean('allow_walk_ins')->default(true);
        $table->boolean('require_patient_approval')->default(false);

        $table->boolean('same_day_booking')->default(true);

        $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('clinic_details');
    }
};