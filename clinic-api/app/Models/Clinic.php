<?php

namespace App\Models;
use App\Models\User;
use App\Models\Patient;
use App\Models\Appointment;
use App\Models\ClinicDetail;
use App\Models\clinicServices;
use App\Models\Service;
use App\Models\Bill;
use App\Models\DoctorProfile;
use Illuminate\Database\Eloquent\Model;

class Clinic extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'is_active',
        'domain',
    ];

    /*
    |--------------------------------------------------------------------------
    | RELATIONSHIPS
    |--------------------------------------------------------------------------
    */

    // Clinic has many users (doctor, secretary)
    public function users()
    {
        return $this->hasMany(User::class);
    }

    // Clinic has many patients
    public function patients()
    {
        return $this->hasMany(Patient::class);
    }

    // Clinic has many appointments
    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    // Clinic has many bills
    public function bills()
    {
        return $this->hasMany(Bill::class);
    }

    public function supportsMultipleDoctors(): bool
    {
        return $this->has_multiple_doctors || $this->max_doctors > 1;
    }

    public function doctor()
    {
        return $this->hasOne(User::class)->where('role', 'doctor');
    }

    public function secretary()
    {
        return $this->hasOne(User::class)->where('role', 'secretary');
    }

    public function clinicDetails()
    {
        return $this->hasOne(ClinicDetail::class);
    }

    public function service()
    {
        return $this->hasMany(Service::class);
    }

    public function services()
    {
        return $this->belongsToMany(Service::class, 'clinic_service')
            ->withPivot(['price', 'duration', 'is_active'])
            ->withTimestamps();
    }

    public function clinicServices()
    {
        return $this->hasMany(ClinicServices::class);
    }
    
    public function doctorProfile()
    {
        return $this->hasOne(DoctorProfile::class);
    }



}