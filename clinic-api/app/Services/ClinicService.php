<?php

// namespace App\Services;
// use App\Models\Permission;
// use App\Models\Clinic;
// use App\Models\User;
// use Illuminate\Support\Str;
// use Illuminate\Support\Facades\Hash;

// class ClinicService
// {


//     public function getAll()
//     {
//         return Clinic::all();
//     }

//     public function createClinicWithUsers($data)
//     {
//         // 1. Create clinic
//         $clinic = Clinic::create([
//             'name'      => $data['clinic_name'],
//             'slug'      => Str::slug($data['clinic_name']),
//             'domain'    => $data['domain']
//         ]);

//         // 2. Create DOCTOR (required)
//         $doctor = User::create([
//             'name' => $data['doctor_name'],
//             'email' => $data['doctor_email'],
//             'password' => Hash::make($data['doctor_password']),
//             'role' => 'doctor',
//             'clinic_id' => $clinic->id,
//         ]);

//         // assign doctor permissions
//         $this->assignPermissions($doctor, config('permissions.doctor'));

//         $secretary = null;

//         // 3. OPTIONAL secretary
//         if (!empty($data['secretary_email'])) {

//             $secretary = User::create([
//                 'name' => $data['secretary_name'],
//                 'email' => $data['secretary_email'],
//                 'password' => Hash::make($data['secretary_password']),
//                 'role' => 'secretary',
//                 'clinic_id' => $clinic->id,
//             ]);

//             $this->assignPermissions($secretary, config('permissions.secretary'));
//         }

//         return [
//             'clinic' => $clinic,
//             'doctor' => $doctor,
//             'secretary' => $secretary
//         ];
//     }

//     private function assignPermissions($user, $permissions)
//     {
//         foreach ($permissions as $perm) {
//             Permission::create([
//                 'user_id' => $user->id,
//                 'key' => $perm
//             ]);
//         }
//     }
// }

namespace App\Services;

use App\Models\Clinic;
use App\Models\ClinicDetail;
use App\Models\ClinicSettings;
use App\Models\Patient;
use App\Models\Appointment;
use App\Models\Service;
use App\Models\ClinicServices;
use App\Models\User;
use App\Models\DoctorProfile;
use App\Models\Permission;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class ClinicService
{
    public function getAll()
    {
        return Clinic::all();
    }

    public function createClinicWithUsers($data)
    {
        DB::beginTransaction();

        try {

            // 1. Base slug from name
            $slug = Str::slug($data['clinic_name']);

            if (empty($slug)) {
                $slug = 'clinic';
            }

            // 3. FINAL SAFETY: ensure slug is truly unique
            $originalSlug = $slug;
            $count = 1;

            while (Clinic::where('slug', $slug)->exists()) {
                $slug = $originalSlug . '-' . $count++;
            }

            // 1. CREATE CLINIC
            $clinic = Clinic::create([
                'name'   => $data['clinic_name'],
                'slug'   => $slug,
                'domain' => $data['domain'] ?? $slug,
            ]);

            // 2. CREATE DEFAULT CLINIC SETTINGS
            ClinicDetail::create([
                'clinic_id' => $clinic->id,
                'name' => '' . $clinic->name,
                'description' => 'Welcome to ' . $clinic->name,
                'address' => null,
                'contact_email' => null,
                'contact_phone' => null,
                'logo' => null,
                'website' => null,
                'facebook_url' => null,
                'instagram_url' => null,
                'x_url' => null,
            ]);
            ClinicSettings::create([
                'clinic_id' => 1,

                // Scheduling
                'allow_online_booking' => true,
                'appointment_slot_duration' => 30,

                // Notifications
                'enable_email_notifications' => true,
                'enable_sms_notifications' => false,

                // Business rules   
                'require_approval_for_appointments' => false,
                'max_appointments_per_day' => 20,
                'allow_walk_in' => true,

                // System
                'timezone' => 'Asia/Manila',

                // 🎨 UI THEME
                'theme_color' => 'blue',      // default: blue
                'template' => 'modern',       // default: modern
                'layout' => 'template_a',     // default: template A
            ]);

            // // 3. SEED DEFAULT SERVICES
            // $defaultServices = [
            //     ['name' => 'General Consultation', 'price' => 500],
            //     ['name' => 'Dental Cleaning', 'price' => 1200],
            //     ['name' => 'Laboratory Test', 'price' => 1500],
            // ];

            // foreach ($defaultServices as $service) {
            //     Service::create([
            //         'clinic_id' => $clinic->id,
            //         'name' => $service['name'],
            //         'price' => $service['price'],
            //         'duration_minutes' => 30,
            //         'is_active' => true,
            //     ]);
            // }

            // 4. CREATE DOCTOR
            $doctor = User::create([
                'name' => $data['doctor']['name'] ?? "Doctor - ".$data['clinic_name'],
                'email' => $data['doctor_email'] ?? 'doctor'.$slug.'@email.com',
                'password' => Hash::make($data['doctor_password'] ?? "doctor123"),
                'role' => 'doctor',
                'clinic_id' => $clinic->id,
            ]);

            $profile = DoctorProfile::create([
                'user_id' => $doctor->id,
                'display_name' => $doctor->name,
                'clinic_id' => $clinic->id,
            ]);

            $this->assignPermissions($doctor, config('permissions.doctor'));

            // 5. OPTIONAL SECRETARY
            $secretary = null;

            if (!empty($data['secretary']['enabled'])) {

                $secretary = User::create([
                    'name' => $data['secretary_name'] ?? "Secretary - ".$data['clinic_name'],
                    'email' => $data['secretary_email'] ?? null,
                    'password' => Hash::make($data['secretary_password']  ?? "doctor123"),
                    'role' => 'secretary',
                    'clinic_id' => $clinic->id,
                ]);

                $this->assignPermissions($secretary, config('permissions.secretary'));
            }

            DB::commit();

            return [
                'clinic' => $clinic,
                'doctor' => $doctor,
                'secretary' => $secretary
            ];

        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function getDashboard($clinicID)
    {

          // 1. If numeric → treat as ID
        if (is_numeric($clinicID)) {
            $clinic = Clinic::findOrFail($clinicID);
        }
        // 2. Otherwise → treat as slug
        else {
            $clinic = Clinic::where('slug', $clinicID)->firstOrFail();
        }

        // now you ALWAYS have clinic model
        $clinicId = $clinic->id;
        $clinic = Clinic::with(['user', 'secretary','doctorProfile'])
            ->where('id', $clinicId)
            ->firstOrFail();

        $totalPatients = Patient::where('clinic_id', $clinicId)->count();
        $services = ClinicServices::where('clinic_id', $clinicId)->with('service:id,name,description')->get();

        $recenAppointments = Appointment::where('clinic_id', $clinicId)
        ->where('status','completed')
        ->latest()
        ->limit(5)
        ->get();

        $upcomingAppointments = Appointment::where('clinic_id', $clinicId)
        ->where('status','approved')
        ->whereDate('appointment_date', now())
        ->latest()
        ->limit(5)
        ->get();

        $newRequestsList = Appointment::where('clinic_id', $clinicId)
        ->where('status','pending')
        ->with('patient:id,name')
        ->with('service:id,name')
        ->latest()
        ->limit(5)
        ->get();

        $appointmentsToday =  Appointment::where('clinic_id', $clinicId)
        ->whereDate('appointment_date', now())
        ->with('patient:id,name')
        ->with('service:id,name')
        ->get();
        
        $appointmentsTodayCount = Appointment::where('clinic_id', $clinicId)
            ->whereDate('appointment_date', now())
            ->count();

        // Average monthly patients (last 6 months)
        $monthlyAvg = Appointment::where('clinic_id', $clinicId)
            ->where('appointment_date', '>=', now()->subMonths(6))
            ->selectRaw('COUNT(*) / 6 as avg')
            ->value('avg');        
            
        $clinicDetails = ClinicDetail::where('clinic_id', $clinicId)
        ->latest()->get();

        return [
            'clinic' => [
                'name' => $clinic->name,
                'address' => $clinic->address,
                'status' => $clinic->is_active,
            ],

            'doctor' => $clinic->user ? [
                'clinic_id' => $clinic->id,
                'doctor_id' => $clinic->user->id,
                'name' => $clinic->user->name,
                'email' => $clinic->user->email,
            ] : null,

            'secretary' => $clinic->secretary ? [
                'name' => $clinic->secretary->name,
                'email' => $clinic->secretary->email,
            ] : null,

            'stats' => [
                'total_patients' => $totalPatients,
                'appointmentsToday' => $appointmentsTodayCount,
                'monthly_patients_avg' => round($monthlyAvg ?? 0),
            ],
            'services' => $services,
            'recent_appointments' => $recenAppointments,
            'newRequestList' => $newRequestsList,
            'upcomingAppointments' => $upcomingAppointments,
            'clinic_details' => $clinicDetails,
            'doctor_profile' => $clinic->doctorProfile,
            'appointmentsToday' => $appointmentsToday,
        ];
    }

    public function getDashboardPublic($clinicID)
    {

          // 1. If numeric → treat as ID
        if (is_numeric($clinicID)) {
            $clinic = Clinic::findOrFail($clinicID);
        }
        // 2. Otherwise → treat as slug
        else {
            $clinic = Clinic::where('slug', $clinicID)->firstOrFail();
        }

        // now you ALWAYS have clinic model
        $clinicId = $clinic->id;
        $clinic = Clinic::with(['user', 'secretary','clinicDetails','clinicSettings','doctorProfile'])
            ->where('id', $clinicId)
            ->firstOrFail();

        $services = ClinicServices::where('clinic_id', $clinicId)->with('service:id,name,description')->get();

        return [
            'clinic' => [
                'name' => $clinic->name,
                'address' => $clinic->address,
                'status' => $clinic->is_active,
            ],
            'doctor' => $clinic->doctor ? [
                'clinic_id' => $clinic->id,
                'doctor_id' => $clinic->doctor->id,
                'name' => $clinic->doctor->name,
                'email' => $clinic->doctor->email,
            ] : null,
            'services' => $services,
            'doctor' => $clinic->user,
            'doctor_profile' => $clinic->doctorProfile,
            'clinic_settings' => $clinic->clinicSettings,
            'clinic_details' => $clinic->clinicDetails,

        ];
    }

    private function assignPermissions($user, $permissions)
    {
        foreach ($permissions as $perm) {
            Permission::create([
                'user_id' => $user->id,
                'key' => $perm
            ]);
        }
    }
}