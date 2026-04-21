<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Clinic;

class ClinicSeeder extends Seeder
{
    public function run(): void
    {
        Clinic::create([
            'name' => 'Main Clinic',
            'slug' => 'main_clinic',
            'domain' => '',
        ]);
    }
}
