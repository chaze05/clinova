<?php

namespace App\Services;
use App\Models\Permission;
use App\Models\Clinic;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class ClinicService
{
    public function createClinicWithUsers($data)
    {
        // 1. Create clinic
        $clinic = Clinic::create([
            'name' => $data['clinic_name'],
            'slug' => Str::slug($data['clinic_name']),
        ]);

        // 2. Create DOCTOR (required)
        $doctor = User::create([
            'name' => $data['doctor_name'],
            'email' => $data['doctor_email'],
            'password' => Hash::make($data['doctor_password']),
            'role' => 'doctor',
            'clinic_id' => $clinic->id,
        ]);

        // assign doctor permissions
        $this->assignPermissions($doctor, config('permissions.doctor'));

        $secretary = null;

        // 3. OPTIONAL secretary
        if (!empty($data['secretary_email'])) {

            $secretary = User::create([
                'name' => $data['secretary_name'],
                'email' => $data['secretary_email'],
                'password' => Hash::make($data['secretary_password']),
                'role' => 'secretary',
                'clinic_id' => $clinic->id,
            ]);

            $this->assignPermissions($secretary, config('permissions.secretary'));
        }

        return [
            'clinic' => $clinic,
            'doctor' => $doctor,
            'secretary' => $secretary
        ];
    }

    private function assignPermissions($user, $permissions)
    {
        foreach ($permissions as $perm) {
            Permission::create([
                'user_id' => $user->id,
                'key' => $perm
            ]);
        }
    }
}