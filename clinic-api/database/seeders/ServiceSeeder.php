<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            ['Consultation', 300, 30],
            ['Dental Cleaning', 800, 60],
            ['Tooth Extraction', 1200, 45],
            ['Root Canal', 2500, 90],
            ['Braces Consultation', 500, 30],
            ['X-Ray', 400, 15],
            ['Filling', 600, 30],
            ['Teeth Whitening', 3000, 60],
            ['Dentures', 5000, 120],
            ['Emergency Treatment', 1000, 30],
        ];

        foreach ($services as $s) {
            DB::table('services')->insert([
                'name' => $s[0],
                'description' => $s[0] . ' service',
                'default_price' => $s[1],
                'default_duration' => $s[2],
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}