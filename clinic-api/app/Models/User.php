<?php

namespace App\Models;
use App\Models\Permission;
use App\Models\Patient;
use App\Models\Clinic;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'role',
        'clinic_id',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * RELATIONSHIP: user has many permissions
     */
    public function permissions()
    {
        return $this->hasMany(Permission::class);
    }

    /**
     * CHECK IF USER HAS A PERMISSION
     */
    public function hasPermission($key)
    {
        return $this->permissions()
            ->where('key', $key)
            ->exists();
    }

    public function doctorProfile()
    {
        return $this->hasOne(DoctorProfile::class);
    }
    public function patient()
    {
        return $this->hasMany(Patient::class);
    }
    public function clinic()
    {
        return $this->belongsTo(Clinic::class);
    }
}
