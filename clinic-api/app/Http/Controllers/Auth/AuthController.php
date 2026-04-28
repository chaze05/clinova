<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\AuthService;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * LOGIN (SANCTUM SPA - COOKIE BASED)
     */
    // public function login(Request $request)
    // {
    //     $credentials = $request->validate([
    //         'email' => 'required|email',
    //         'password' => 'required'
    //     ]);

    //     if (!Auth::attempt($credentials)) {
    //         return response()->json([
    //             'message' => 'Invalid credentials'
    //         ], 401);
    //     }

    //     // IMPORTANT: regenerate session AFTER login
    //     $request->session()->regenerate();

    //     return response()->json(
    //         Auth::user() // 🔥 IMPORTANT: return raw user
    //     );
    // }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = Auth::user();

        // delete old tokens (optional)
        $user->tokens()->delete();

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
            'clinic_id'=> $user->clinic_id,
            'role'     => $user->role,
        ]);
    }

    /**
     * REGISTER
     */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'role' => 'nullable'
        ]);

        $user = $this->authService->register($request->all());

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user
        ]);
    }

    /**
     * LOGOUT (SANCTUM SPA)
     */
    // public function logout(Request $request)
    // {
    //     if (Auth::check()) {
    //         Auth::guard('web')->logout();
    //     }

    //     $request->session()->invalidate();
    //     $request->session()->regenerateToken();

    //     return response()->json([
    //         'message' => 'Logged out successfully'
    //     ]);
    // }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }

    /**
     * CURRENT USER
     */
    public function user(Request $request)
    {
        return response()->json(
            $request->user() // 🔥 return raw user (NOT wrapped)
        );
    }
}