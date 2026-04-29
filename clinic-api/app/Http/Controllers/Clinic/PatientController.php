<?php

namespace App\Http\Controllers\Clinic;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Patient;
use App\Services\PatientService;
use App\Services\UserService;

class PatientController extends Controller
{
    protected $service;
    protected $user;
    
    public function __construct()
    {
        $this->service = new PatientService(); // ❌ or missing entirely
        $this->user  = new UserService(); // ❌ or missing entirely
    }
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
            'clinic_id'=>'nullable',
            'patientName' => 'required',
            'patientEmail' => 'required',
            'patientMobile' => 'required',
            'service'       => 'required',
            'doctor_id' => 'nullable',
            'date' => 'required|date',
            'time' => 'required',
            'end_time' => 'nullable'
        ]);
        $clinicID = $this->user->getClinicID($data['doctor_id']);
        return response()->json(
            $this->service->findOrCreate($data, $request->user()->clinic_id ?? $clinicID)
        );
    }

    public function patient(Request $request)
    {
        $data = $request->validate([
            'clinic_id'=>'nullable',
            'patientName' => 'required',
            'patientEmail' => 'required',
            'patientMobile' => 'required',
            'status'        => 'nullable',
        ]);

        return response()->json(
            $this->service->patient($data, $request->user()->clinic_id)
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
    // public function search(Request $request)
    // {
    //     $request->validate([
    //         'q' => 'required|string|min:2'
    //     ]);

    //     return Patient::where('clinic_id', $request->user()->clinic_id)
    //         ->where(function ($q) use ($request) {
    //             $q->where('first_name', 'like', "%{$request->q}%")
    //               ->orWhere('last_name', 'like', "%{$request->q}%")
    //               ->orWhere('phone', 'like', "%{$request->q}%")
    //               ->orWhere('email', 'like', "%{$request->q}%")
    //         })
    //         ->limit(10)
    //         ->get()
    //         ->map(function ($patient) {
    //             return [
    //                 'id' => $patient->id,
    //                 'name' => $patient->first_name . ' ' . $patient->last_name,
    //                 'phone' => $patient->phone,
    //                 'email' => $patient->email,
    //             ];
    //         });
    // }
    public function search(Request $request)
    {
        $query = $request->query('q');

        if (!$query) {
            return response()->json([]);
        }

        $patients = $this->service->searchPatients($query);

        return response()->json($patients);
    }
}