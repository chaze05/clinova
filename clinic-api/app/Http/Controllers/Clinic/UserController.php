<?php

namespace App\Http\Controllers\Clinic;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\UserService;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->middleware('auth:sanctum');
        $this->userService = $userService;
    }

    public function storeSecretary(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        $user = $this->userService->createSecretary(
            $request->all(),
            auth()->user()->clinic_id
        );

        return response()->json([
            'message' => 'Secretary created successfully',
            'data' => $user
        ]);
    }
}