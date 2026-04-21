<?php

namespace App\Http\Controllers\Clinic;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AppointmentAttachmentController extends Controller
{
    public function store(Request $request, $appointmentId, AttachmentService $service)
    {
        $request->validate([
            'file' => 'required|file|max:10240'
        ]);

        $appointment = Appointment::where('clinic_id', $request->user()->clinic_id)
            ->findOrFail($appointmentId);

        $attachment = $service->upload(
            $request->file('file'),
            $appointment,
            $request->user()
        );

        return response()->json($attachment);
    }
}
