<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravolt\Avatar\Facade as Avatar;


class AvatarController extends Controller
{
    public function generate(Request $request)
    {
        $name = $request->query('name', 'User');

        $avatar = Avatar::create($name)->toBase64();

        return response()->json([
            'avatar' => $avatar
        ]);
    }
}
