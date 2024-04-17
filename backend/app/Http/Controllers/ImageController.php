<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Product;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Validate the uploaded image
            'product_id' => 'required|exists:products,id', // Validate the product ID
        ]);
        

        // Handle image upload
        // if ($request->hasFile('image')) {
        //     $image = $request->file('image');
        //     $imageName = time() . '.' . $image->getClientOriginalExtension();
        //     $image->move(public_path('images'), $imageName);
        // }
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);
            $imagePath = url('images/'.$imageName);
        }

        // Create a new image record in the database
        $image = new Image();
        $image->image = $imagePath;
        $image->product_id = $request->product_id;
        $image->save();

        return response()->json(['message' => 'Image uploaded successfully'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Image $image)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Image $image)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Image $image)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Image $image)
    {
        //
    }

    // public function getImagesForProduct($productId)
    // {
    //     $product = Product::find($productId);

    //     if (!$product) {
    //         return response()->json(['error' => 'Product not found'], 404);
    //     }

    //     $images = Image::where('product_id', $productId)->get();

    //     return response()->json(['images' => $images], 200);
    // }
}
