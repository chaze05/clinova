<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AppointmentAttachment extends Model
{
    protected $fillable = [
        'clinic_id',
        'appointment_id',
        'patient_id',
        'uploaded_by',
        'file_name',
        'file_path',
        'file_type',
    ];

    public function appointment()
    {
        return $this->belongsTo(App\Models\Appointment::class);
    }

    public function patient()
    {
        return $this->belongsTo(App\Models\Patient::class);
    }
}