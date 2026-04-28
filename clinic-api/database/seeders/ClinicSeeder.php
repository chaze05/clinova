<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class ClinicSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('clinics')->insert([
            [
                'name' => 'B.Sanchez Dental Clinic',
                'slug' => Str::slug('b-sanchez-dental-clinic'),
                'domain' => 'b-sanchez.local',
                'is_active' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        ]);
    }
}   