<?php

namespace App\Http\Controllers\Clinic;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreClinicRequest;
use Illuminate\Http\Request;
use App\Services\ClinicService;


class ClinicController extends Controller
{
  
    protected $service;
    
    public function __construct()
    {
        $this->service = new ClinicService(); // ❌ or missing entirely
    }
    /**
     * LIST PATIENTS (clinic scoped)
     */
    public function index(Request $request)
    {   
        return response()->json(
            $this->service->getAll()
        );
    }
     /**
     * CREATE NEW CLINIC ADMIN SIDE
     */
    public function create(StoreClinicRequest $request)
    {   
        $data = $request->validated();

        return response()->json(
            $this->service->createClinicWithUsers($data)
        );

        return response()->json([
            'message' => 'Clinic created successfully',
            'data' => $clinic
        ]);
    }

    public function show($id)
    {
        return $this->service->getDashboard($id);
    }

    public function showPublic($slug)
    {
        return $this->service->getDashboardPublic($slug);
    }
}