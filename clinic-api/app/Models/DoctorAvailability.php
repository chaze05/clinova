<?php

namespace App\Models;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class DoctorAvailability extends Model
{
    protected $fillable =[ 
        "doctor_id",
        "date",
        "type",
        "half_day_period",
        "reason",
    ];
      
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
