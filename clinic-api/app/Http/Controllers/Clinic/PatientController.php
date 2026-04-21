<?php

namespace App\Http\Controllers\Clinic;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Patient;

class PatientController extends Controller
{
    /**
     * CREATE PATIENT
     */
    // public function store(Request $request)
    // {
    //     $data = $request->validate([
    //         'first_name' => 'required',
    //         'last_name' => 'nullable',
    //         'phone' => 'required',
    //         'email' => 'nullable',
    //         'birthdate' => 'nullable|date',
    //         'address' => 'nullable',
    //     ]);

    //     $patient = Patient::create([
    //         'clinic_id' => $request->user()->clinic_id,
    //         'first_name' => $data['first_name'],
    //         'last_name' => $data['last_name'] ?? '',
    //         'phone' => $data['phone'],
    //         'email' => $data['email'] ?? null,
    //         'birthdate' => $data['birthdate'] ?? null,
    //         'address' => $data['address'] ?? null,
    //     ]);

    //     return response()->json($patient);
    // }

    public function store(Request $request)
    {
        $data = $request->validate([
            'patient_id' => 'nullable',
            'patient.first_name' => 'nullable',
            'patient.last_name' => 'nullable',
            'patient.phone' => 'required',

            'doctor_id' => 'required',
            'appointment_date' => 'required|date',
            'start_time' => 'nullable',
            'end_time' => 'nullable',
        ]);

        return response()->json(
            $this->service->create($data, $request->user())
        );
    }

    /**
     * LIST PATIENTS (clinic scoped)
     */
    public function index(Request $request)
    {
        return Patient::where('clinic_id', $request->user()->clinic_id)
            ->latest()
            ->get();
    }

    /**
     * SHOW SINGLE PATIENT + HISTORY READY
     */
    public function show(Request $request, $id)
    {
        return Patient::where('clinic_id', $request->user()->clinic_id)
            ->with(['appointments'])
            ->findOrFail($id);
    }

    /**
     * UPDATE PATIENT
     */
    public function update(Request $request, $id)
    {
        $patient = Patient::where('clinic_id', $request->user()->clinic_id)
            ->findOrFail($id);

        $patient->update($request->all());

        return response()->json($patient);
    }

    /**
     * SEARCH PATIENTS (for booking UI)
     */
    public function search(Request $request)
    {
        $request->validate([
            'q' => 'required|string|min:2'
        ]);

        return Patient::where('clinic_id', $request->user()->clinic_id)
            ->where(function ($q) use ($request) {
                $q->where('first_name', 'like', "%{$request->q}%")
                  ->orWhere('last_name', 'like', "%{$request->q}%")
                  ->orWhere('phone', 'like', "%{$request->q}%")
                  ->orWhere('email', 'like', "%{$request->q}%");
            })
            ->limit(10)
            ->get()
            ->map(function ($patient) {
                return [
                    'id' => $patient->id,
                    'name' => $patient->first_name . ' ' . $patient->last_name,
                    'phone' => $patient->phone,
                    'email' => $patient->email,
                ];
            });
    }
}