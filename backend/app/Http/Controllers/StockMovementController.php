<?php

namespace App\Http\Controllers;

use App\Models\StockMovement;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class StockMovementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $movements = StockMovement::all();
        return response()->json(['movements' => $movements], 200);
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
            // Validation rules
        ]);

        $movement = StockMovement::create($request->all());

        return response()->json(['message' => 'Movement created successfully', 'movement' => $movement], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(StockMovement $stockMovement)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(StockMovement $stockMovement)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $movement = StockMovement::findOrFail($id);

        $request->validate([
            // Validation rules
        ]);

        $movement->update($request->all());

        return response()->json(['message' => 'Movement updated successfully', 'movement' => $movement], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $movement = StockMovement::findOrFail($id);
        $movement->delete();

        return response()->json(['message' => 'Movement deleted successfully'], 200);
    }
}
