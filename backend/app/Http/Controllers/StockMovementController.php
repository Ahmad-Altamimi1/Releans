<?php

namespace App\Http\Controllers;

use App\Models\StockMovement;
use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class StockMovementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $movements = StockMovement::all();
        $movements = StockMovement::join('users', 'stock_movements.userId', '=', 'users.id')
            ->join('products', 'stock_movements.productId', '=', 'products.id')
            ->select('users.name as userName', 'products.name as productName', 'stock_movements.*')
            ->get()
            ->map(function ($movement) {
                return [
                    'userName' => $movement->userName,
                    'productName' => $movement->productName,
                    'movement' => $movement,
                ];
            });


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
        $rules = [
            'productId' => 'required', // You might want to adjust this rule based on your application requirements
            'quantity' => 'required|integer|min:1',
            'movement_type' => 'required|in:addition,deduction',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
        $user_id = Auth::user()->id;

        $request_data = $request->all();
        $request_data['userId'] = $user_id;
        $yearMonth = Carbon::now()->format('Ym');
        $movementNumber = 'PRO' . $yearMonth . $request_data['quantity'];
        $request_data['movNo'] = $movementNumber;

        $movement = StockMovement::create($request_data);
        $Product = Product::findOrfail($movement->productId);
        if ($request_data['movement_type'] == 'addition') {

            $Product->quantity += $request_data['quantity'];
            $Product->save();
        } else {
            $Product->quantity -= $request_data['quantity'];
            $Product->save();
        }


        return response()->json(['message' => 'Movement created successfully', 'Movement' => $movement], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $movement = StockMovement::findOrfail($id);
        return response()->json(['Movement' => $movement], 201);
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
        $userId = Auth::user()->id;
        $request['userId'] = $userId;
        $movement->update($request->all());

        $Product = Product::findOrfail($movement->id);
        $totalquantity = 0;
        foreach (StockMovement::where('productId', '=', $Product->id) as $key => $value) {
            if ($value->movement_type == 'addition') {
                $totalquantity += $value->quantity;
            } else {
                $totalquantity -= $value->quantity;
            }
        }

        $Product->quantity = $totalquantity;
        $Product->save();
        return response()->json(['message' => 'Movement updated successfully', 'movement' => $movement], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $movement = StockMovement::findOrFail($id);
        $Product = Product::findOrfail($movement->id);

        $movement->delete();
        $totalquantity = 0;

        foreach (StockMovement::where('productId', '=', $Product->id) as $key => $value) {
            if ($value->movement_type == 'addition') {
                $totalquantity += $value->quantity;
            } else {
                $totalquantity -= $value->quantity;
            }
        }

        $Product->quantity = $totalquantity;
        $Product->save();
        return response()->json(['message' => 'Movement deleted successfully'], 200);
    }
}
