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
        Schema::create('doctor_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('clinic_id')->nullable()->constrained()->nullOnDelete();

            // Basic identity
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('display_name')->nullable(); // e.g. Dr. John Doe
            $table->string('slug')->nullable(); // for public page URL

            // Professional info
            $table->string('specialty')->nullable(); // MVP: string first
            $table->string('sub_specialty')->nullable();
            $table->integer('years_experience')->nullable();

            // Credentials
            $table->string('license_number')->nullable();
            $table->string('board_certifications')->nullable();

            // Content (for homepage/profile)
            $table->text('bio')->nullable();
            $table->text('education')->nullable();
            $table->text('experience')->nullable();

            // Media
            $table->string('photo')->nullable();

            // Visibility
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
