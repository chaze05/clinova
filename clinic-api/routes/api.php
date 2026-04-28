<?php

use Illuminate\Support\Facades\Route;
// use Illuminate\Support\Facades\Request;
use App\Http\Controllers\Clinic\AppointmentController;
use App\Http\Controllers\Clinic\ClinicController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Clinic\PatientController;
use App\Http\Controllers\Clinic\ClinicServicesController;
use Illuminate\Http\Request;

Route::prefix('auth')->group(function () {

    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/user', [AuthController::class, 'user']);
    });

});


Route::middleware(['auth:sanctum', 'clinic'])->group(function () {

    // APPOINTMENT ROUTES
    Route::get('/appointments/slots', [AppointmentController::class, 'slots']);
    Route::get('/appointments', [AppointmentController::class, 'index']);
    Route::post('/appointments', [AppointmentController::class, 'store']);
    Route::patch('/appointments/{id}/confirm', [AppointmentController::class, 'confirm']);
    Route::patch('/appointments/{id}/complete', [AppointmentController::class, 'complete']);
    Route::patch('/appointments/{id}/cancel', [AppointmentController::class, 'cancel']);
    Route::post('/appointments/{id}/attachments', 
        [AppointmentAttachmentController::class, 'store']
    );;
    // APPOINTMENT ROUTES

    // PATIENT ROUTES
    Route::get('/patients', [PatientController::class, 'index']);
    Route::post('/patients', [PatientController::class, 'patient']);
    // SEARCH (for booking UI)
    Route::get('/patients/search', [PatientController::class, 'search']);
    // SEARCH PATIENT
    Route::get('/patients/{id}', [PatientController::class, 'show']);
    Route::put('/patients/{id}', [PatientController::class, 'update']);

    // PATIENT ROUTES

    // CLINIC ROUTES
    Route::get('/clinics', [ClinicController::class, 'index']);
    Route::post('/addClinic', [ClinicController::class, 'create']);
    Route::get('/clinic/{id}', [ClinicController::class, 'show']);

    // SERVICES ROUTES
    Route::get('/services/{id}', [ClinicServicesController::class, 'getServices']);
    Route::get('/services/enable/{id}', [ClinicServicesController::class, 'enableService']);
    Route::post('/clinic/services/toggle', [ClinicServicesController::class, 'toggle']);
});

// CLINC PUBLIC ROUTE
Route::get('/public/{slug}', [ClinicController::class, 'show']);
Route::post('/public/book', [PatientController::class, 'store']);
Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return $request->user();
}); 