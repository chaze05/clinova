<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ClinicServiceSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('clinic_service')->insert([
            [
                'clinic_id' => 1,
                'service_id' => 1,
                'price' => 300,
                'duration' => 30,
                'is_active' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'clinic_id' => 1,
                'service_id' => 2,
                'price' => 800,
                'duration' => 60,
                'is_active' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'clinic_id' => 1,
                'service_id' => 3,
                'price' => 1200,
                'duration' => 45,
                'is_active' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}