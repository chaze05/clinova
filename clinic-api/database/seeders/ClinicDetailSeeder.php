<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ClinicDetailSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('clinic_details')->insert([
            [
                'clinic_id' => 1,
                'description' => 'Modern dental clinic with complete services',
                'address' => 'Zambales, Philippines',
                'contact_email' => 'info@clinova.com',
                'contact_phone' => '09123456789',
                'logo' => null,
                'primary_color' => '#16a34a',
                'secondary_color' => '#0f172a',
                'theme' => 'green',
                'template_key' => 'modern',
                'booking_enabled' => 1,
                'auto_confirm_appointments' => 0,
                'max_appointments_per_slot' => 1,
                'buffer_minutes' => 10,
                'business_hours' => json_encode([
                    'mon' => '09:00-17:00',
                    'tue' => '09:00-17:00',
                    'wed' => '09:00-17:00',
                    'thu' => '09:00-17:00',
                    'fri' => '09:00-17:00',
                ]),
                'email_notifications' => 1,
                'sms_notifications' => 0,
                'notify_patient_on_booking' => 1,
                'notify_clinic_on_booking' => 1,
                'notify_before_appointment' => 1,
                'reminder_hours_before' => 24,
                'allow_walk_ins' => 1,
                'require_patient_approval' => 0,
                'same_day_booking' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        ]);
    }
}