<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    protected function redirectTo($request)
    {
        // IMPORTANT: API should NOT redirect
        if (! $request->expectsJson()) {
            return null;
        }
    }
}