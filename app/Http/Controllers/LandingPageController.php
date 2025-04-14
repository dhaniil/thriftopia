<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class LandingPageController extends Controller
{
    /**
     * Menampilkan landing page React.
     */
    public function index(): Response
    {
        return Inertia::render('thriftopia/pages/Welcome');
    }
}
