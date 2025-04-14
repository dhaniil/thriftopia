<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CheckPermission
{
    public function handle($request, Closure $next, $permission)
    {
        if (Auth::check() && Auth::user()->hasPermissionTo($permission)) {
            return $next($request);
        }

        abort(403, 'Unauthorized');
    }
}