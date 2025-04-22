<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function show($slug)
    {
        $product = Product::with(['category.parent', 'images'])
            ->where('slug', $slug)
            ->firstOrFail();

        $similarProducts = Product::with(['images'])
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->paginate(4);

        return Inertia::render('DetailProduct', [
            'product' => $product,
            'similarProducts' => $similarProducts,
        ]);
    }
}
