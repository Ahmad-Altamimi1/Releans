<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Order;
use App\Models\OrderItem;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::join('users', 'orders.user_id', '=', 'users.id')
            ->select('orders.*', 'users.name as userName')
            ->get();
        $allProducts = Product::where('delete', '=', 'false')->get();
        return response()->json(['orders' => $orders,'allProducts' => $allProducts], 200);
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
        // Validate incoming request data
        $validatedData = $request->validate([
            'items.*.product_id' => 'required|exists:products,id', 
            'items.*.quantity' => 'required|integer|min:1', 
        ]);
        // Create a new order
        $order = Order::create([
            'user_id' => Auth::user()->id,
            'total_price' => 0, 
            'status' => 'pending', 
        ]);
        
        // Calculate total price and create order items
        $totalPrice = 0;
        foreach ($validatedData['items'] as $item) {
            
            $product = Product::find($item['productId']);
            if ($product) {
                $priceForUnit = $product->price;
                $totalPrice += $priceForUnit * $item['quantity'];

                // Create order item
                OrderItem::create([
                    'orderId' => $order->id,
                    'productId' => $item['productId'],
                    'quantity' => $item['quantity'],
                    'price_for_unit' => $priceForUnit,
                ]);
            }
        }

        // Update the total price of the order
        $order->total_price = $totalPrice;
        $order->save();

        return response()->json(['message' => 'Order created successfully', 'order' => $order], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $order;


    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
