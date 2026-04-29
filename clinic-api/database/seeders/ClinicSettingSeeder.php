<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ClinicSettings;

class ClinicSettingSeeder extends Seeder
{
    public function run(): void
    {
        ClinicSetting::create([
            'clinic_id' => 1,

            // Scheduling
            'allow_online_booking' => true,
            'appointment_slot_duration' => 30,

            // Notifications
            'enable_email_notifications' => true,
            'enable_sms_notifications' => false,

            // Business rules   
            'require_approval_for_appointments' => false,
            'allow_walk_in' => true,

            // System
            'timezone' => 'Asia/Manila',

            // 🎨 UI THEME
            'theme_color' => 'blue',      // default: blue
            'template' => 'modern',       // default: modern
            'layout' => 'template_a',     // default: template A
        ]);
    }
}