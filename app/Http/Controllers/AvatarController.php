<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Laravolt\Avatar\Facade as Avatar;

class AvatarController extends Controller
{
    public function show(Request $request)
    {
        try {
            $name = $request->query('name', 'User');
            
            $avatar = Avatar::create($name)->toBase64();
            
            // Remove data:image/png;base64, prefix
            $imageData = base64_decode(substr($avatar, 22));
            
            return response($imageData)
                ->header('Content-Type', 'image/png')
                ->header('Cache-Control', 'public, max-age=3600');
            
        } catch (\Exception $e) {
            Log::error('Avatar generation error', [
                'error' => $e->getMessage(),
                'name' => $name ?? 'N/A'
            ]);
            
            // Generate default avatar
            try {
                $avatar = Avatar::create('User')->toBase64();
                $imageData = base64_decode(substr($avatar, 22));
                
                return response($imageData)
                    ->header('Content-Type', 'image/png')
                    ->header('Cache-Control', 'public, max-age=3600');
                    
            } catch (\Exception $e2) {
                Log::error('Default avatar generation failed', [
                    'error' => $e2->getMessage()
                ]);
                return response()->noContent(404);
            }
        }
    }
}
