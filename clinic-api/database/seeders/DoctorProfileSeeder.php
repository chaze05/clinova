<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DoctorProfileSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        // Use user_id = 2 (doctor account)
        $userId = 2;

        $clinic = DB::table('clinics')->first();

        if (!$clinic) {
            return;
        }

        // Safety: ensure user exists
        $userExists = DB::table('users')->where('id', $userId)->exists();

        if (!$userExists) {
            return;
        }

        DB::table('doctor_profiles')->updateOrInsert(
            [
                'user_id' => $userId,
            ],
            [
                'clinic_id' => $clinic->id,

                'first_name' => 'Beverly',
                'last_name' => 'Sanchez',
                'display_name' => 'Dr. Beverly Sanchez',
                'slug' => 'dr-beverly-sanchez',

                'specialty' => 'Dentistry',
                'sub_specialty' => 'Orthodontics',
                'years_experience' => 8,

                'license_number' => 'DENT-123456',
                'board_certifications' => 'Philippine Dental Board Certified',

                'bio' => 'Experienced dentist specializing in orthodontics and orthodontic care.',
                'education' => 'DDS - Doctor of Dental Surgery',
                'experience' => '8 years private practice',

                'photo' => 'https://l1nq.com/0mx4l9c',

                'is_active' => 1,
                'is_featured' => 1,

                'created_at' => $now,
                'updated_at' => $now,
            ]
        );
    }
}