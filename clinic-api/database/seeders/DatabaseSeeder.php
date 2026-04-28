<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            ClinicSeeder::class,
            UserSeeder::class,
            ClinicDetailSeeder::class,
            ServiceSeeder::class,
            ClinicServicesSeeder::class,
            PatientSeeder::class,
            AppointmentSeeder::class,
            DoctorProfileSeeder::class,
        ]);
    }
}