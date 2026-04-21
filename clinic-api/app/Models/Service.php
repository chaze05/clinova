<?php

namespace App\Models;

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
        return $this->belongsToMany(App\Models\Appointment::class);
    }
}