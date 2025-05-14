<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('HomePage', [
            'banners' => Banner::where('is_active', true)
                ->get()
                ->map(function ($banner) {
                    return [
                        'title' => $banner->title,
                        'description' => $banner->description,
                        'image_path' => $banner->image_path
                    ];
                }),
            'categories' => Category::all()->map(function ($category) {
                return [
                    'name' => $category->name,
                    'slug' => $category->slug,
                    'image' => $category->image
                ];
            }),
            'products' => Product::with('images')->get()->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price' => $product->price,
                    'size' => $product->size,
                    'image' => $product->images->first()?->url ?? null
                ];
            })
        ]);
    }

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
