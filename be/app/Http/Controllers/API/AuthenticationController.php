<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthenticationRequest;
use App\Http\Requests\RegistrationRequest;
use App\Models\Role;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;

class AuthenticationController extends BaseController
{
    public function login(AuthenticationRequest $request)
    {
        if (auth()->guard('admin')->attempt(['username' => request('username'), 'password' => request('password')])) {

            config(['auth.guards.api.provider' => 'admin']);

            $admin = User::select('users.*')->find(auth()->guard('admin')->user()->id);
            $tokenGenerate = $admin->createToken('MyApp', ['admin']);
            $token = $tokenGenerate->token;

            if ($request->remember_me) {
                $token->expires_at = Carbon::now()->addWeeks(10);
            } else {
                $token->expires_at = Carbon::now()->addHour();
            }

            $token->save();

            $success =  $admin;
            $success['token'] = $tokenGenerate->accessToken;
            $success['expires_at'] = Carbon::parse($token->expires_at)->toDateTimeString();

            return $this->sendResponse($success, 'User login successfully.');
        } else {
            return $this->sendError('Unauthorised.', ['error' => 'Unauthorised']);
        }
    }

    public function me(Request $request)
    {
        return $this->sendResponse($request->user(), 'User Fetched Successfully.');
    }


    public function registration(RegistrationRequest $request)
    {
        $input = $request->all();
        $employeeRoleId = Role::where('name', 'Employee')->first()->id;

        $input['role_id'] = $employeeRoleId;
        $input['password'] = bcrypt($request->password);
        $user = User::create($input);

        return $this->sendResponse($user, 'User registered successfully.');
    }

    public function logout(Request $request)
    {
        auth()->guard('admin')->logout();

        $request->user()->token()->revoke();

        return $this->sendResponse(["success"], 'User Logout Successffuly.');
    }
}
