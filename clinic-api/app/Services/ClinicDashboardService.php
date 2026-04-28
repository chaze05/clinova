<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class ClinicDashboardService
{
    public function getDashboard($clinicId)
    {
        $clinic = Clinic::with(['doctor', 'secretary'])
            ->where('id', $clinicId)
            ->firstOrFail();

        $totalPatients = Patient::where('clinic_id', $clinicId)->count();

        $recenAppointments = Appointment::where('clinic_id', $clinicId)
        ->where('status','completed')
        ->latest()
        ->limit(5)
        ->get();

        $newRequestsList = Appointment::where('clinic_id', $clinicId)
        ->where('status','pending')
        ->with('patient:id,name')
        ->latest()
        ->limit(5)
        ->get();

        $appointmentsToday = Appointment::where('clinic_id', $clinicId)
        ->whereDate('appointment_date', now())
        ->count();

        // Average monthly patients (last 6 months)
        $monthlyAvg = Appointment::where('clinic_id', $clinicId)
            ->where('appointment_date', '>=', now()->subMonths(6))
            ->selectRaw('COUNT(*) / 6 as avg')
            ->value('avg');

        return [
            'clinic' => [
                'name' => $clinic->name,
                'address' => $clinic->address,
                'status' => $clinic->status,
            ],

            'doctor' => $clinic->doctor ? [
                'name' => $clinic->doctor->name,
                'email' => $clinic->doctor->email,
            ] : null,

            'secretary' => $clinic->secretary ? [
                'name' => $clinic->secretary->name,
                'email' => $clinic->secretary->email,
            ] : null,

            'stats' => [
                'total_patients' => $totalPatients,
                'appointments_today' => $appointmentsToday,
                'monthly_patients_avg' => round($monthlyAvg ?? 0),
            ],
            'recent_appointments' => $recent_appointments,
            'newRequestList' => $newRequestsList,
        ];
    }
}