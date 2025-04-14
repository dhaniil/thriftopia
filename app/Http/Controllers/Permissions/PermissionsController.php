<?php
namespace App\Http\Controllers\Permissions;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;


class PermissionsController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if ($user->hasRole('admin')) {
            return redirect('/admin'); 
        }
    
        abort(403, 'Akses ditolak. Hanya admin yang bisa mengakses.');
    }
}
