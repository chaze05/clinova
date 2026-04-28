<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ClinicServicesSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        // change this if multiple clinics later
        $clinics = DB::table('clinics')->pluck('id');

        $services = DB::table('services')->get();

        foreach ($clinics as $clinicId) {
            foreach ($services as $service) {

                DB::table('clinic_services')->updateOrInsert(
                    [
                        'clinic_id' => $clinicId,
                        'service_id' => $service->id,
                    ],
                    [
                        // use service defaults (can override later per clinic)
                        'price' => $service->default_price,
                        'duration' => $service->default_duration,
                        'is_active' => 1,

                        'created_at' => $now,
                        'updated_at' => $now,
                    ]
                );
            }
        }
    }
}