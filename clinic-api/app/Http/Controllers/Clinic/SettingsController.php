<?php

namespace App\Http\Controllers\Clinic;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\ClinicSettingsService;

class SettingsController extends Controller
{
    protected $service;

    public function __construct()
    {
        $this->service = new ClinicSettingsService(); // ❌ or missing entirely
    }


    public function index(Request $request)
    {           
        return response()->json($this->service->getSettings($request->user()->clinic_id));
    }
}
