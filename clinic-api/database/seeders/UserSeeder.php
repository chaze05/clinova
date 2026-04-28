<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'clinic_id' => null,
                'name' => 'Super Admin',
                'email' => 'admin@clinic.com',
                'password' => Hash::make('password'),
                'role' => 'super_admin',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'clinic_id' => 1,
                'name' => 'Dr. Beverly Sanchez',
                'email' => 'bsanchez@gmail.com',
                'password' => Hash::make('doctor123'),
                'role' => 'doctor',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'clinic_id' => 1,
                'name' => 'Secretary',
                'email' => 'secretary@gmail.com',
                'password' => Hash::make('secretary123'),
                'role' => 'secretary',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}