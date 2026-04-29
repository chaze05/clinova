<?php

namespace App\Services;

use App\Models\User;
use App\Models\Clinic;
use App\Models\Permission;
use Illuminate\Support\Facades\Hash;

class UserService
{
    public function createSecretary($data, $clinicId)
    {
        // 1. Create secretary
        $secretary = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role' => 'secretary',
            'clinic_id' => $clinicId,
        ]);

        // 2. Assign default secretary permissions
        $permissions = config('permissions.secretary');

        foreach ($permissions as $perm) {
            Permission::create([
                'user_id' => $secretary->id,
                'key' => $perm
            ]);
        }

        return $secretary;
    }

    public function getClinicID($doctorID)
    {
        $clinicID = User::where('id', $doctorID)->value('clinic_id');

        return $clinicID;
    }
}