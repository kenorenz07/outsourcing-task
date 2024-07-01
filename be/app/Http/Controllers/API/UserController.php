<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegistrationRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class UserController extends BaseController
{

    public function index(Request $request)
    {
        // $this->authorize('viewAny', User::class);

        $users = User::query();

        $per_page = $request->query('per_page') ? $request->query('per_page') : 10;
        $sortBy = $request->query('sortBy');

        if ($request->query('search_key')) {
            $users->where(function ($query) use ($request) {
                $query->where("name", 'LIKE', "%" . $request->query('search_key') . "%");
            });
        }

        if ($sortBy) {
            foreach ($sortBy as $key => $sort) {
                $users->orderBy($sort['key'], $sort['order']);
            }
        }

        return $users->paginate($per_page);
    }

    public function getAll()
    {
        return User::all();
    }

    public function getEmployees()
    {
        $employeeRoleId = Role::where('name', 'Employee')->first()->id;

        $users = User::where('role_id', $employeeRoleId)->get();

        return $this->sendResponse($users, 'Employees retrieved successfully.');
    }

    public function store(RegistrationRequest $request)
    {
        $this->authorize('create', User::class);

        $input = $request->all();
        $employeeRoleId = Role::where('name', 'Employee')->first()->id;

        $input['role_id'] = $employeeRoleId;
        $input['password'] = bcrypt($request->password);
        $user = User::create($input);

        return $this->sendResponse($user, 'User registered successfully.');
    }

    public function show($id)
    {
        $this->authorize('viewAny', User::class);

        $user = User::find($id);

        if (is_null($user)) {
            return $this->sendError('User not found.');
        }

        return $this->sendResponse($user, 'User retrieved successfully.');
    }

    public function update(RegistrationRequest $request, User $user)
    {
        $this->authorize('update', User::class);

        $input = $request->all();

        if (!isset($input['password'])) {
            unset($input['password']);
        } else {
            $input['password'] = bcrypt($request->password);
        }

        $user->update($input);

        return $this->sendResponse($user, 'User updated successfully.');
    }

    public function destroy(User $user)
    {
        $this->authorize('delete', User::class);

        $user->delete();

        return $this->sendResponse([], 'User deleted successfully.');
    }
}
