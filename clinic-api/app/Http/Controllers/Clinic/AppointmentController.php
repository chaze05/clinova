<?php

namespace App\Http\Controllers\Clinic;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\AppointmentService;


class AppointmentController extends Controller
{
    public function __construct(
        protected AppointmentService $service
    ) {}

    // LIST APPOINTMENTS
    public function index(Request $request)
    {
        return response()->json(
            $this->service->getAll($request, $request->user()->clinic_id)
        );
    }
    public function filterStatus(Request $request)
    {
        return response()->json(
            $this->service->getAllStatus($request->user()->clinic_id,$data['status'])
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            // PATIENT
            'patient_id' => 'nullable|exists:patients,id',
            'patientName' => 'required_without:patient_id|string|max:255',
            'patientMobile' => 'nullable|string|max:50',

            // APPOINTMENT DETAILS
            // 'doctor_id' => 'nullable|exists:users,id',
            'date' => 'required|date|after_or_equal:today',
            'time' => 'nullable|date_format:H:i',
            'end_time' => 'nullable|date_format:H:i|after:start_time',

            // SERVICES
            'service' => 'nullable',
            // 'services.*.id' => 'required|exists:services,id',
        ]);

        $appointment = $this->service->create($data, $request->user());

        return response()->json([
            'message' => 'Appointment created successfully',
            'data' => $appointment
        ]);
    }

//     public function create(array $data, $user)
//     {
//         // 1. FIND OR CREATE PATIENT
//         if (isset($data['patient_id'])) {
//             $patientId = $data['patient_id'];
//         } else {
//             $patient = Patient::create([
//                 'clinic_id' => $user->clinic_id,
//                 'first_name' => $data['patient']['first_name'],
//                 'last_name' => $data['patient']['last_name'] ?? '',
//                 'phone' => $data['patient']['phone'] ?? null,
//             ]);

//             $patientId = $patient->id;
//         }

//         // 2. CREATE APPOINTMENT
//         $appointment = Appointment::create([
//             'clinic_id' => $user->clinic_id,
//             'patient_id' => $patientId,
//             'doctor_id' => $data['doctor_id'],
//             'appointment_date' => $data['appointment_date'],
//             'start_time' => $data['start_time'] ?? null,
//             'end_time' => $data['end_time'] ?? null,
//             'status' => 'pending',
//             'created_by' => $user->id,
//         ]);

//         // 3. ATTACH SERVICES (NEW PART)
//         if (!empty($data['services'])) {

//             $attachData = [];

//             foreach ($data['services'] as $service) {

//                 $model = Service::find($service['id']);

//                 if ($model) {
//                     $attachData[$model->id] = [
//                         'price' => $model->price, // snapshot
//                     ];
//                 }
//             }

//             $appointment->services()->attach($attachData);
//         }

//         return $appointment->load(['services', 'patient']);
// }

    // SHOW SINGLE APPOINTMENT
    public function show(Request $request, $id)
    {
        return response()->json(
            $this->service->find($id, $request->user()->clinic_id)
        );
    }

    // CONFIRM APPOINTMENT
    public function confirm(Request $request, $id)
    {
        return response()->json(
            $this->service->updateStatus($id, 'confirmed', $request->user()->clinic_id)
        );
    }

    // COMPLETE APPOINTMENT
    public function complete(Request $request, $id)
    {
        return response()->json(
            $this->service->updateStatus($id, 'completed', $request->user()->clinic_id)
        );
    }

    // CANCEL APPOINTMENT
    public function cancel(Request $request, $id)
    {
        return response()->json(
            $this->service->updateStatus($id, 'rejected', $request->user()->clinic_id)
        );
    }

   public function slots(Request $request)
    {
        $data = $request->validate([
            'date' => 'required|date',
            'doctor_id' => 'nullable|integer',
        ]);

        $clinicId = $request->user()->clinic_id;

        $slots = app(SchedulerResolver::class)
            ->resolve(Clinic::find($clinicId))
            ->generateSlots(
                $clinicId,
                $data['doctor_id'] ?? null,
                $data['date']
            );

        return response()->json([
            'date' => $data['date'],
            'slots' => $slots
        ]);
    }
}