<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AppointmentSeeder extends Seeder
{
    public function run(): void
    {
        for ($i = 1; $i <= 15; $i++) {
            DB::table('appointments')->insert([
                'clinic_id' => 1,
                'patient_id' => rand(1, 10),
                'doctor_id' => 2,
                'created_by' => 1,
                'service_id' => rand(1, 5),
                'title' => 'Appointment ' . $i,
                'description' => 'Routine checkup',
                'appointment_date' => Carbon::now()->addDays($i)->toDateString(),
                'start_time' => '10:00:00',
                'end_time' => '11:00:00',
                'status' => ['pending', 'confirmed', 'completed'][rand(0, 2)],
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}