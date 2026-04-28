<?php

namespace App\Models;

use App\Http\Models\Clinic;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClinicDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'clinic_id',

        // branding
        'description',
        'address',
        'contact_email',
        'contact_phone',
        'logo',
        'primary_color',
        'secondary_color',
        'template_key',

        // booking
        'booking_enabled',
        'auto_confirm_appointments',
        'max_appointments_per_slot',
        'buffer_minutes',

        // business hours
        'business_hours',

        // notifications
        'email_notifications',
        'sms_notifications',
        'notify_patient_on_booking',
        'notify_clinic_on_booking',
        'notify_before_appointment',
        'reminder_hours_before',

        // behavior
        'allow_walk_ins',
        'require_patient_approval',
        'same_day_booking',
    ];

    protected $casts = [
        'booking_enabled' => 'boolean',
        'auto_confirm_appointments' => 'boolean',
        'email_notifications' => 'boolean',
        'sms_notifications' => 'boolean',
        'notify_patient_on_booking' => 'boolean',
        'notify_clinic_on_booking' => 'boolean',
        'notify_before_appointment' => 'boolean',
        'allow_walk_ins' => 'boolean',
        'require_patient_approval' => 'boolean',
        'same_day_booking' => 'boolean',

        'business_hours' => 'array',
    ];

    /**
     * Clinic relation
     */
    public function clinic()
    {
        return $this->belongsTo(Clinic::class);
    }
}