<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Clinic\AppointmentController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Clinic\PatientController;


Route::prefix('auth')->group(function () {

    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/user', [AuthController::class, 'user']);
    });

});


Route::middleware(['auth:sanctum', 'clinic'])->group(function () {



});

Route::middleware('auth:sanctum', 'clinic')->group(function () {

    // APPOINTMENT ROUTES
    Route::get('/clinic/appointments/slots', [AppointmentController::class, 'slots']);
    Route::get('/clinic/appointments', [AppointmentController::class, 'index']);
    Route::post('/clinic/appointments', [AppointmentController::class, 'store']);
    Route::patch('/clinic/appointments/{id}/confirm', [AppointmentController::class, 'confirm']);
    Route::patch('/clinic/appointments/{id}/complete', [AppointmentController::class, 'complete']);
    Route::patch('/clinic/appointments/{id}/cancel', [AppointmentController::class, 'cancel']);
    Route::post('/clinic/appointments/{id}/attachments', 
        [AppointmentAttachmentController::class, 'store']
    );;
    // APPOINTMENT ROUTES

    // PATIENT ROUTES
    Route::get('/clinic/patients', [PatientController::class, 'index']);
    Route::post('/clinic/patients', [PatientController::class, 'store']);
    Route::get('/clinic/patients/{id}', [PatientController::class, 'show']);
    Route::put('/clinic/patients/{id}', [PatientController::class, 'update']);
    // SEARCH (for booking UI)
    Route::get('/clinic/patients/search', [PatientController::class, 'search']);
    // PATIENT ROUTES


});