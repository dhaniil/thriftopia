<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravolt\Avatar\Facade as Avatar;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

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

    public function updateProfile(Request $request)
    {
        $user = auth()->user();
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
        ]);

        $user->update($validated);

        return back()->with('message', 'Profile berhasil diperbarui');
    }

    public function uploadAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        $user = auth()->user();

        if ($request->hasFile('avatar')) {
            // Hapus avatar lama jika ada
            if ($user->avatar) {
                Storage::disk('public')->delete($user->avatar);
            }

            // Upload avatar baru
            $path = $request->file('avatar')->store('avatars', 'public');
            
            $user->update([
                'avatar' => $path
            ]);

            return back()->with('message', 'Avatar berhasil diperbarui');
        }

        return back()->with('error', 'Tidak ada file yang diupload');
    }
}
