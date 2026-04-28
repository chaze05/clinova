<?php

namespace App\Services;

use App\Models\Clinic;
use App\Models\ClinicServices;
use App\Models\Service;
use Illuminate\Support\Facades\DB;

class ClinicServicesManager
{
    /**
     * GET ALL CLINICS
     */
    public function getAll($clinicId)
    {
    return Service::query()
        ->leftJoin('clinic_services as cs', function ($join) use ($clinicId) {
            $join->on('services.id', '=', 'cs.service_id')
                ->where('cs.clinic_id', $clinicId);
        })
        ->select(
            'services.*',
            'cs.price',
            'cs.duration',
            'cs.is_active'
        )
        ->orderByDesc('cs.is_active')
        ->orderBy('services.name')
        ->get();
    }
    /**
     * GET SINGLE CLINIC
     */
    public function getById($id)
    {
        return Clinic::with(['services'])->findOrFail($id);
    }

    /**
     * CREATE CLINIC
     */
    public function create(array $data)
    {
        return DB::transaction(function () use ($data) {
            return Clinic::create($data);
        });
    }

    public function toggleService($serviceId, $isActive, $data = [])
    {
        $user = auth()->user();

        // Check if already exists for this clinic
        $clinicService = ClinicServices::where('clinic_id', $user->clinic_id)
            ->where('service_id', $serviceId)
            ->first();

        // ✅ FIRST TIME → create with full data
        if (!$clinicService) {

            // Optional: enforce required fields
            if (empty($data['price']) || empty($data['duration'])) {
                abort(422, 'Price and duration are required on first enable');
            }

            return ClinicServices::create([
                'clinic_id' => $user->clinic_id,
                'service_id' => $serviceId,
                'price' => $data['price'],
                'duration' => $data['duration'],
                'is_active' => $isActive,
            ]);
        }

        // ✅ ALREADY EXISTS → only update status
        $clinicService->update([
            'is_active' => $isActive
        ]);

        return $clinicService;
    }

    /**
     * UPDATE CLINIC
     */
    public function update($id, array $data)
    {
        $clinic = Clinic::findOrFail($id);
        $clinic->update($data);

        return $clinic;
    }

    /**
     * DELETE CLINIC
     */
    public function delete($id)
    {
        $clinic = Clinic::findOrFail($id);
        return $clinic->delete();
    }

    /**
     * ENABLE / UPDATE SERVICE (REQUIRES PRICE + DURATION)
     */
    public function enableService($clinicId, $serviceId, $price, $duration)
    {
        if ($price === null || $duration === null) {
            throw new \Exception("Price and duration are required when enabling a service.");
        }

        return ClinicServices::updateOrCreate(
            [
                'clinic_id' => $clinicId,
                'service_id' => $serviceId,
            ],
            [
                'price' => $price,
                'duration' => $duration,
                'is_active' => true,
            ]
        );
    }

    /**
     * DISABLE SERVICE
     */
    public function disableService($clinicId, $serviceId)
    {
        return ClinicServices::where('clinic_id', $clinicId)
            ->where('service_id', $serviceId)
            ->update([
                'is_active' => false
            ]);
    }

    /**
     * TOGGLE SERVICE (SAFE OPTION)
     * - ON requires price + duration
     * - OFF just disables
     */
    // public function toggleService($clinicId, $serviceId, $isActive, $price = null, $duration = null)
    // {
    //     if ($isActive && ($price === null || $duration === null)) {
    //         throw new \Exception("Price and duration are required when enabling a service.");
    //     }

    //     return ClinicServices::updateOrCreate(
    //         [
    //             'clinic_id' => $clinicId,
    //             'service_id' => $serviceId,
    //         ],
    //         [
    //             'price' => $price ?? 0,
    //             'duration' => $duration ?? 0,
    //             'is_active' => $isActive,
    //         ]
    //     );
    // }

    /**
     * REMOVE SERVICE COMPLETELY FROM CLINIC
     */
    public function removeService($clinicId, $serviceId)
    {
        return ClinicServices::where('clinic_id', $clinicId)
            ->where('service_id', $serviceId)
            ->delete();
    }
}