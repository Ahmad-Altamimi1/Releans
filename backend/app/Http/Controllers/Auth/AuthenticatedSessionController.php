<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Response;
use Laravel\Passport\Client;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;
use Illuminate\Http\JsonResponse;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): View
    {
        return view('auth.login');
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): JsonResponse
    {
        $request->authenticate();

        $credentials = $request->only('email', 'password');
        // $request->session()->regenerate();


        if (Auth::attempt($credentials)) {
            $user = Auth::user();


            $client = new Client();
            $client->user_id = null;
            $client->name = 'Custom Client Name';
            $client->secret = "Dwo8kHUOKBDm6SZ0LCg175z5KAGqVdk9EMhrRAZz";
            $client->redirect = 'http://localhost';
            $client->personal_access_client = 1;
            $client->password_client = 0;
            $client->revoked = 0;
            $client->save();
            // Generate an access token for the user
            $token = $user->createToken('app')->accessToken;

            return response()->json(['token' => $token, 'user' => $user], 200);
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): JsonResponse
    {
        // Revoke the current access token
        $request->user()->token()->revoke();

        // Delete the user's token from the database
        $request->user()->token()->delete();

        return response()->json(['message' => 'Logged out successfully'], 200);
    }
}
