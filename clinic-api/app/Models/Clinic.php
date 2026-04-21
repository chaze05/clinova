<?php

namespace App\Models;
use App\Models\User;
use App\Models\Patient;
use App\Models\Appointment;
use App\Models\Bill;
use Illuminate\Database\Eloquent\Model;

class Clinic extends Model
{
    protected $fillable = [
        'name',
        'slug',
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
}