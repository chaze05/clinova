<?php

namespace App\Services;

use App\Models\Patient;

class PatientService
{
    /**
     * Find existing patient or create new one
     */
    public function findOrCreate(array $data, $clinicId)
    {
        // 1. If patient_id provided
        if (!empty($data['patient_id'])) {
            return Patient::where('id', $data['patient_id'])
            ->where('clinic_id', $clinicId)
            ->firstOrFail();
        }

        // 2. Try find by contact (phone/email)
        $patient = Patient::where('clinic_id', $clinicId)
            ->where(function ($q) use ($data) {
                if (!empty($data['patient']['phone'])) {
                    $q->orWhere('phone', $data['patient']['phone']);
                }

                if (!empty($data['patient']['email'])) {
                    $q->orWhere('email', $data['patient']['email']);
                }
            })
            ->first();

        if ($patient) {
            return $patient;
        }

        // 3. Create new patient
        return Patient::create([
            'clinic_id' => $clinicId,
            'first_name' => $data['patient']['first_name'],
            'last_name' => $data['patient']['last_name'] ?? '',
            'phone' => $data['patient']['phone'] ?? null,
            'email' => $data['patient']['email'] ?? null,
        ]);
    }
}