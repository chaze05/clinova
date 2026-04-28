<?php

namespace App\Services;

use App\Models\Appointment;

class AppointmentService
{
    protected $patientService;

    public function __construct(PatientService $patientService)
    {
        $this->patientService = $patientService;
    }

    private function validateAppointmentRules($data, $clinicId)
    {
        $this->checkScheduleBlocks($data, $clinicId);
        $this->checkDoctorAvailability($data, $clinicId);
        $this->checkOverlaps($data, $clinicId);
        $this->validateTimeSlot($data);
    }

    // GET ALL APPOINTMENTS (CLINIC SCOPED)
    public function getAll($request, $clinicId)
    {
        $status = $request->query('status');

        return Appointment::where('clinic_id', $clinicId)
            ->with(['patient', 'doctor','service'])
            ->when($status, function ($query) use ($status) {
                $query->where('status', $status);
            })
            ->orderBy('appointment_date', 'desc')
            ->get();
    }

    public function fitlerStatus($clinicId,$stauts)
    {
        return Appointment::where('clinic_id', $clinicId)
            ->with(['patient', 'doctor'])
            ->whereStatus('status', $stauts)
            ->latest()
            ->get();
    }

    // CREATE APPOINTMENT
    public function create(array $data, $user)
    {
        // 1. FIND OR USE PATIENT
        $patient = $this->patientService->findOrCreate($data, $user->clinic_id);

        $patientId = $patient->id;

        // $blocked = ClinicSchedule::where('clinic_id', $clinicId)
        // ->whereDate('date', $data['date'])
        // ->first();

        // if ($blocked && $blocked->type === 'full_day_off') {
        //     abort(422, 'Clinic is closed on this date');
        // }

        // $this->validateAppointmentRules($data, $user->clinic_id);

        // 2. CREATE APPOINTMENT
        return Appointment::create([
            'clinic_id' => $user->clinic_id,
            'patient_id' => $patientId,
            'doctor_id' => $user->id,
            'appointment_date' => $data['date'],
            'service_id' => $data['service'],
            'start_time' => $data['time'] ?? null,
            'end_time' => $data['end_time'] ?? null,
            'status' => $user->id ? 'confirmed':'pending',
            'created_by' => $user->id ?? $patientId,
        ]);
    }

    // GET SINGLE APPOINTMENT
    public function find($id, $clinicId)
    {
        return Appointment::where('clinic_id', $clinicId)
            ->with(['patient', 'doctor'])
            ->findOrFail($id);
    }

    // UPDATE STATUS
    public function updateStatus($id, $status, $clinicId)
    {
        $appointment = Appointment::where('clinic_id', $clinicId)
            ->findOrFail($id);

        $appointment->update([
            'status' => $status
        ]);

        return $appointment;
    }

    public function upload($file, $appointment, $user)
    {
        $path = $file->store('appointments');

        return AppointmentAttachment::create([
            'clinic_id' => $user->clinic_id,
            'appointment_id' => $appointment->id,
            'patient_id' => $appointment->patient_id,
            'uploaded_by' => $user->id,
            'file_name' => $file->getClientOriginalName(),
            'file_path' => $path,
            'file_type' => $file->getClientMimeType(),
        ]);
    }

    private function checkScheduleBlocks($data, $clinicId)
    {
        $blocked = ClinicSchedule::where('clinic_id', $clinicId)
            ->whereDate('date', $data['appointment_date'])
            ->first();

        if ($blocked && $blocked->type === 'full_day_off') {
            abort(422, 'Clinic is closed on this date');
        }

        if ($blocked && $blocked->type === 'half_day') {
            // optional: enforce time restriction
            if (!empty($data['start_time'])) {
                $start = strtotime($data['start_time']);

                if ($start >= strtotime($blocked->start_time) &&
                    $start <= strtotime($blocked->end_time)) {
                    abort(422, 'Clinic is on half-day schedule');
                }
            }
        }
    }

    private function checkDoctorAvailability($data, $clinicId)
    {
        $exists = Appointment::where('clinic_id', $clinicId)
            ->where('doctor_id', $data['doctor_id'])
            ->whereDate('appointment_date', $data['appointment_date'])
            ->exists();

        // (this alone is not blocking yet, used for schedule rules later)
    }
    private function checkOverlaps($data, $clinicId)
    {
        if (empty($data['start_time']) || empty($data['end_time'])) {
            return;
        }

        $query = Appointment::where('clinic_id', $clinicId)
            ->where('doctor_id', $data['doctor_id'])
            ->whereDate('appointment_date', $data['appointment_date'])
            ->where(function ($q) use ($data) {

                $q->whereBetween('start_time', [$data['start_time'], $data['end_time']])
                ->orWhereBetween('end_time', [$data['start_time'], $data['end_time']])
                ->orWhere(function ($q2) use ($data) {
                    $q2->where('start_time', '<=', $data['start_time'])
                        ->where('end_time', '>=', $data['end_time']);
                });
            })
            ->exists();

        if ($query) {
            abort(422, 'This time slot is already booked');
        }
    }

    private function validateTimeSlot($data)
    {
        if (empty($data['start_time']) || empty($data['end_time'])) {
            return;
        }

        $start = strtotime($data['start_time']);
        $end = strtotime($data['end_time']);

        if ($end <= $start) {
            abort(422, 'Invalid time range');
        }

        // optional: enforce minimum duration (e.g. 15 mins)
        $diffMinutes = ($end - $start) / 60;

        if ($diffMinutes < 15) {
            abort(422, 'Minimum appointment duration is 15 minutes');
        }
    }

    public function generateSlots($clinicId, $doctorId, $date)
    {
        $slots = [];

        // 1. CHECK FULL DAY BLOCK
        $blocked = ClinicSchedule::where('clinic_id', $clinicId)
            ->whereDate('date', $date)
            ->first();

        if ($blocked && $blocked->type === 'full_day_off') {
            return [];
        }

        // 2. GET CLINIC DAILY SCHEDULE (single doctor clinic)
        $schedule = ClinicSchedule::where('clinic_id', $clinicId)
            ->whereNull('doctor_id')
            ->where(function ($q) use ($date) {
                $q->whereDate('date', $date)
                  ->orWhereNull('date');
            })
            ->first();

        if (!$schedule || $schedule->is_closed) {
            return [];
        }

        if (!$schedule->start_time || !$schedule->end_time) {
            return [];
        }

        $start = strtotime($schedule->start_time);
        $end = strtotime($schedule->end_time);

        // 3. GET EXISTING APPOINTMENTS (all clinic since single doctor)
        $appointments = Appointment::where('clinic_id', $clinicId)
            ->whereDate('appointment_date', $date)
            ->get();

        $bookedSlots = [];

        foreach ($appointments as $appointment) {
            if ($appointment->start_time) {
                $bookedSlots[] = $appointment->start_time;
            }
        }

        // 4. SLOT CONFIGURATION (30 min default)
        $slotDuration = 30 * 60;

        // 5. GENERATE AVAILABLE SLOTS
        for ($time = $start; $time < $end; $time += $slotDuration) {

            $slot = date('H:i', $time);

            if (!in_array($slot, $bookedSlots)) {
                $slots[] = $slot;
            }
        }

        return $slots;
    }
}