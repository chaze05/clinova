<?php

namespace App\Http\Controllers\Clinic;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\ClinicServicesManager;

class ClinicServicesController extends Controller
{
    protected $clinicService;

    public function __construct(ClinicServicesManager $clinicService)
    {
        $this->clinicService = $clinicService;
    }

    /**
     * GET ALL CLINICS
     */
    public function index()
    {
        return response()->json(
            $this->clinicService->getAll()
        );
    }


    public function getServices($clinicId)
    {
        return response()->json(
            $this->clinicService->getAll($clinicId)
        );
    }
    /**
     * GET SINGLE CLINIC
     */
    public function show($id)
    {
        return response()->json(
            $this->clinicService->getById($id)
        );
    }

    /**
     * CREATE CLINIC
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'address' => 'nullable|string',
            'contact' => 'nullable|string',
        ]);

        return response()->json(
            $this->clinicService->create($data)
        );
    }

    /**
     * UPDATE CLINIC
     */
    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'name' => 'sometimes|string',
            'address' => 'nullable|string',
            'contact' => 'nullable|string',
        ]);

        return response()->json(
            $this->clinicService->update($id, $data)
        );
    }

    /**
     * DELETE CLINIC
     */
    public function destroy($id)
    {
        return response()->json([
            'success' => $this->clinicService->delete($id)
        ]);
    }

    /**
     * ENABLE SERVICE (requires price + duration)
     */
    public function enableService(Request $request, $clinicId)
    {
        $data = $request->validate([
            'service_id' => 'required|integer',
            'price' => 'required|numeric',
            'duration' => 'required|integer',
        ]);

        return response()->json(
            $this->clinicService->enableService(
                $clinicId,
                $data['service_id'],
                $data['price'],
                $data['duration']
            )
        );
    }

        public function toggle(Request $request)
    {
        $request->validate([
            'service_id' => 'required|integer',
            'is_active' => 'required|boolean',
        ]);

        $service = $this->clinicService->toggleService(
            $request->service_id,
            $request->is_active,
            $request->all()
        );

        return response()->json([
            'message' => 'Service updated successfully',
            'data' => $service
        ]);
    }

    /**
     * DISABLE SERVICE
     */
    public function disableService(Request $request, $clinicId)
    {
        $data = $request->validate([
            'service_id' => 'required|integer',
        ]);

        return response()->json([
            'success' => $this->clinicService->disableService(
                $clinicId,
                $data['service_id']
            )
        ]);
    }

    /**
     * TOGGLE SERVICE (SAFE FULL CONTROL)
     */
    public function toggleService(Request $request, $clinicId)
    {
        $data = $request->validate([
            'service_id' => 'required|integer',
            'is_active' => 'required|boolean',
            'price' => 'nullable|numeric',
            'duration' => 'nullable|integer',
        ]);

        return response()->json(
            $this->clinicService->toggleService(
                $clinicId,
                $data['service_id'],
                $data['is_active'],
                $data['price'] ?? null,
                $data['duration'] ?? null
            )
        );
    }
}