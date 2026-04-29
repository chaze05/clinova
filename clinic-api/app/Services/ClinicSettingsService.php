<?php

namespace App\Services;

use App\Models\Clinic;
use App\Models\User;
use App\Models\ClinicSettings;
use App\Models\ClinicDetail;
use Illuminate\Support\Facades\DB;

class ClinicSettingsService
{
    /**
     * GET ALL CLINICS
     */
    public function getSettings($clinicId)
    {
        return Clinic::where('id', $clinicId)
        ->with('ClinicSettings')
        ->with('ClinicDetails')
        ->get();
    }

    public function getProfile($clinicId)
    {
        return User::where('id', $clinicId)
        ->with('doctorProfile')
        ->get();
    }
 
}