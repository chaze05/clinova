<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClinicServices extends Model
{
    protected $table = 'clinic_services';

    protected $fillable = [
        'clinic_id',
        'service_id',
        'price',
        'duration',
        'is_active',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'duration' => 'integer',
        'is_active' => 'boolean',
    ];

    // Relationship: belongs to Clinic
    public function clinic()
    {
        return $this->belongsTo(Clinic::class);
    }

    // Relationship: belongs to Service
    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}