<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $notifications = Notification::with(['user:id,name', 'product:id,name'])
            ->orderBy('id', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($notification) {
                return [
                    'userName' => $notification->user->name,
                    'productName' => $notification->product->name,
                    'notification' => $notification,
                ];
            });
        return response()->json(['notifications' => $notifications], 200);
    }
    public function notReednotifications()
    {
        $notifications = Notification::where('open', '=', 'false')->get();
        return response()->json(['notReednotifications' => $notifications], 200);
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
        $notification = Notification::create($request->all());

        return response()->json([
            'message' => 'Notification created successfully',
            'id' => $notification->id
        ], 201);
    }
    /**
     * Display the specified resource.
     */
    public function show(Notification $notification)
    {
        return response()->json(['notification' => $notification], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Notification $notification)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $notification = Notification::findOrFail($id);


        $notification->update($request->all());

        return response()->json(['message' => 'Notification updated successfully', 'notification' => $notification], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $notification = Notification::findOrFail($id);
        $notification->delete();

        return response()->json(['message' => 'Notification deleted successfully'], 200);
    }
}
