<?php

namespace App\Models;

use App\Http\Models\Clinic;
use App\Http\Models\Appoinment;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'clinic_id',
        'name',
        'description',
        'price',
        'duration_minutes',
        'is_active',
    ];

    public function appointments()
    {
        return $this->belongsToMany(Appointment::class);
    }
    public function clinic()

    {
        return $this->belongsToMany(Clinic::class);
    }

    public function clinicServices()
    {
        return $this->hasMany(ClinicServices::class);
    }

    public function clinics()
    {
        return $this->belongsToMany(Clinic::class, 'clinic_service')
            ->withPivot(['price', 'duration', 'is_active'])
            ->withTimestamps();
    }
}