<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PatientSeeder extends Seeder
{
    public function run(): void
    {
        for ($i = 1; $i <= 10; $i++) {
            DB::table('patients')->insert([
                'clinic_id' => 1,
                'name' => "Patient $i",
                'birthdate' => '1995-01-01',
                'gender' => $i % 2 == 0 ? 'female' : 'male',
                'email'  => "patient$i@email.com",
                'contact_number' => '09' . rand(100000000, 999999999),
                'address' => 'Zambales',
                'notes' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}