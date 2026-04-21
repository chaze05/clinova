<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@test.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        User::create([
            'name' => 'Doctor One',
            'email' => 'doctor@test.com',
            'password' => Hash::make('password'),
            'role' => 'doctor',
        ]);

        User::create([
            'name' => 'Staff User',
            'email' => 'staff@test.com',
            'password' => Hash::make('password'),
            'role' => 'staff',
        ]);
    }
}