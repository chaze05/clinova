<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureClinicAccess
{
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();

        // ALWAYS check this first
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        // Then role logic
        if ($user->role !== "admin") {
            if (!$user->clinic_id) {
                return response()->json(['message' => 'No clinic assigned'], 403);
            }
        }

        // Attach clinic context safely
        $request->merge([
            'clinic_id' => $user->clinic_id
        ]);

        return $next($request);
    }
}