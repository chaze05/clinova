<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DoctorProfilesSeeder extends Seeder
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

                'image' => 'https://scontent.fcrk1-3.fna.fbcdn.net/v/t39.30808-6/533736082_122099896976979733_7262652447743963492_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeHr97Olzbdjxo-QgMi7GToGzJEwJBHe6Q3MkTAkEd7pDcJkp_wlIl6Y5xyMcr2ckBzH3ez2YmcgTP6OUi71dwzB&_nc_ohc=za8mtQwrgi0Q7kNvwFLuiW6&_nc_oc=AdqgBE2zrON-UaQNq2rPW8T-uK2-S3uPjcX6jh5HfosRgEW9YufdKfNSIB_g3x3hPP4&_nc_zt=23&_nc_ht=scontent.fcrk1-3.fna&_nc_gid=cOsNh3zAGnF9VgClGdOX2g&_nc_ss=7b2a8&oh=00_Af00rBZDY0fmJ_ejbr2VhC6iJYJT3tE98vo_cAKwPeWm1w&oe=69F674A5',

                'is_active' => 1,
                'is_featured' => 1,

                'created_at' => $now,
                'updated_at' => $now,
            ]
        );
    }
}