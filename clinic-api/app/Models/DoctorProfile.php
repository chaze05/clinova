<?php

namespace App\Models;

use App\Http\Models\User;
use Illuminate\Database\Eloquent\Model;

class DoctorProfile extends Model
{
   protected $fillable = [
        'user_id',
        'display_name',
        'clinic_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function clinic()
    {
        return $this->belongsTo(Clinic::class);
    }
}
