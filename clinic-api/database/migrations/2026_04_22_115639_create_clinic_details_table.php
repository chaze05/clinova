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
            $table->string('name')->nullable();
            $table->string('description')->nullable();
            $table->string('logo')->nullable();

            // 📍 CONTACT INFO
            $table->string('address')->nullable();
            $table->string('contact_email')->nullable();
            $table->string('contact_phone')->nullable();

            // 🌐 WEBSITE + SOCIALS
            $table->string('website')->nullable();
            $table->string('facebook_url')->nullable();
            $table->string('instagram_url')->nullable();
            $table->string('x_url')->nullable(); // Twitter/X

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('clinic_details');
    }
};