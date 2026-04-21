<?php

namespace App\Models;
use App\Models\User;
use App\Models\Patient;
use App\Models\Service;
use App\Models\Clinic;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    public function clinic()
    {
        return $this->belongsTo(Clinic::class);
    }

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function doctor()
    {
        return $this->belongsTo(User::class, 'doctor_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function services()
    {
        return $this->belongsToMany(Service::class)
            ->withPivot('price')
            ->withTimestamps();
    }
}
