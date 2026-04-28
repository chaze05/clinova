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
                'name' => 'Dr. John Doe',
                'email' => 'doctor@clinic.com',
                'password' => Hash::make('password'),
                'role' => 'doctor',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'clinic_id' => 1,
                'name' => 'Secretary Jane',
                'email' => 'secretary@clinic.com',
                'password' => Hash::make('password'),
                'role' => 'secretary',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}