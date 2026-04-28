<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\Auth\AuthController;

// Route::prefix('auth')->group(function () {

//     Route::post('/login', [AuthController::class, 'login']);
//     Route::post('/register', [AuthController::class, 'register']);
//     Route::post('/logout', [AuthController::class, 'logout']);

//     Route::middleware('auth:sanctum')->group(function () {
//         Route::post('/logout', [AuthController::class, 'logout']);
//         Route::get('/user', [AuthController::class, 'user']);
//     });

// });

// /**
//  * OPTIONAL: simple test endpoint
//  */
Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return $request->user();
});