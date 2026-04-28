<?php

namespace App\Models;

use App\Http\Models\Clinic;
use App\Http\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DoctorProfile extends Model
{
    use HasFactory;

    protected $table = 'doctor_profiles';

    protected $fillable = [
        'user_id',
        'clinic_id',

        // Identity
        'first_name',
        'last_name',
        'display_name',
        'slug',

        // Professional info
        'specialty',
        'sub_specialty',
        'years_experience',

        // Credentials
        'license_number',
        'board_certifications',

        // Content
        'bio',
        'education',
        'experience',

        // Media
        'photo',

        // Visibility
        'is_active',
        'is_featured',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships (important for your system)
    |--------------------------------------------------------------------------
    */

    // Doctor belongs to a user account
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Doctor belongs to a clinic
    public function clinic()
    {
        return $this->belongsTo(Clinic::class);
    }
}
