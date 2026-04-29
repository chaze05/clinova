<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Clinic;

class ClinicSettings extends Model
{
    protected $fillable = [
        'clinic_id',
        'allow_online_booking',
        'appointment_slot_duration',
        'domaenable_email_notificationsin',
        'enable_sms_notifications',
        'require_approval_for_appointments',
        'require_approval_for_appointments',
        'max_appointments_per_day',
    ];

    public function clinic()
    {
          return $this->belongsTo(Clinic::class); 
    }

}
