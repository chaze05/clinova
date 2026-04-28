<?php

namespace App\Services;

use App\Models\Patient;
use App\Models\Appointment;
use App\Models\User;
use App\Models\Clinic;
use App\Services\AppointmentService;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;


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
                if (!empty($data['patientMobile'])) {
                    $q->orWhere('contact_number', $data['patientMobile']);
                }

                // if (!empty($data['patientEmail'])) {
                //     $q->orWhere('email', $data['patientEmail']);
                // }
            })
            ->first();
        $user = User::where('id', $data['doctor_id'])->get();

        $clinicId = $clinicId ??  $user->clinic_id;
        if ($patient) {
            $appointemnt = Appointment::create([
                'clinic_id'         =>  $clinicId,
                'patient_id'        =>  $patient->id,
                'doctor_id'         =>  $data['doctor_id'] ?? $user->id,
                'service_id'        =>  $data['service'],
                'appointment_date'  =>  $data['date'],
                'start_time'        =>  $data['time'],
                'created_by'        =>  $patient->id,
            ]);
            return $patient;
        }

        // 3. Create new patient
        $patient = Patient::create([
            'clinic_id' => $clinicId,
            'name' => $data['patientName'],
            'contact_number' => $data['patientMobile'] ?? null,
            'email' => $data['patientEmail'] ?? null,
        ]);
        
       $appointemnt = Appointment::create([
            'clinic_id'         =>  $clinicId,
            'patient_id'        =>  $patient->id,
            'doctor_id'         =>  $data['doctor_id'],
            'service_id'        =>  $data['service'],
            'appointment_date'  =>  $data['date'],
            'start_time'        =>  $data['time'],
            'created_by'        =>  1,
        ]);

        
        return (['Patient'=> $patient, 'Appointment' => $appointemnt]);
    }

     public function searchPatients(string $query)
    {
        return Patient::query()
            ->where('name', 'LIKE', "%{$query}%")
            ->orWhere('email', 'LIKE', "%{$query}%")
            ->orWhere('contact_number', 'LIKE', "%{$query}%")
            ->limit(10)
            ->get([
                'id',
                'name',
                'email',
                'contact_number'
            ]);
    }

    public function patient(array $data, $clinicId)
    {
        // Try to find existing patient
        $patient = Patient::where('clinic_id', $clinicId)
            ->where(function ($q) use ($data) {
                if (!empty($data['patientEmail'])) {
                    $q->orWhere('email', $data['patientEmail']);
                }

                if (!empty($data['patientMobile'])) {
                    $q->orWhere('contact_number', $data['patientMobile']);
                }
            })
            ->first();

        // If exists → UPDATE
        if ($patient) {
            $patient->update([
                'name'           => $data['patientName'] ?? $patient->name,
                'contact_number' => $data['patientMobile'] ?? $patient->contact_number,
                'email'          => $data['patientEmail'] ?? $patient->email,
                'status'         => $data['status'] ?? $patient->status
            ]);

            return $patient;
        }

        // Otherwise → CREATE
        return Patient::create([
            'clinic_id'      => $clinicId,
            'name'           => $data['patientName'],
            'contact_number' => $data['patientMobile'] ?? null,
            'email'          => $data['patientEmail'] ?? null,
            'status'         => $data['status'],
        ]);
    }
}