<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        $services = [
            ['name' => 'Pasta Filling', 'price' => 1500, 'duration' => 45],
            ['name' => 'Dental Cleaning', 'price' => 1500, 'duration' => 60],
            ['name' => 'Tooth Extraction (Bunot)', 'price' => 1500, 'duration' => 45],
            ['name' => 'Dental X-Ray', 'price' => 1000, 'duration' => 15],
            ['name' => 'Oral Surgery', 'price' => 15000, 'duration' => 120],
            ['name' => 'Teeth Whitening', 'price' => 15000, 'duration' => 90],
            ['name' => 'Emax / Zirconia Crown (per unit)', 'price' => 25000, 'duration' => 90],
            ['name' => 'PFM Crown', 'price' => 8000, 'duration' => 90],
            ['name' => 'Ordinary Denture', 'price' => 13000, 'duration' => 120],
            ['name' => 'Flexible Denture', 'price' => 25000, 'duration' => 150],
            ['name' => 'Orthodontic Braces', 'price' => 60000, 'duration' => 120],
            ['name' => 'Down Payment (Braces)', 'price' => 15000, 'duration' => 0],
            ['name' => 'Monthly Braces Adjustment', 'price' => 1000, 'duration' => 20],
        ];

        foreach ($services as $service) {

            DB::table('services')->updateOrInsert(
                ['name' => $service['name']], // prevents duplicates
                [
                    'description' => $service['name'] . ' service',
                    'default_price' => $service['price'],
                    'default_duration' => $service['duration'],
                    'updated_at' => $now,
                    'created_at' => $now,
                ]
            );
        }
    }
}