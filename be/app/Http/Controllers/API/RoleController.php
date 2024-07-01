<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\RoleResource;
use App\Models\Permission;
use Illuminate\Http\JsonResponse;

class RoleController extends BaseController
{
    public function index(Request $request)
    {
        $this->authorize('viewAny', Role::class);
        $roles = Role::query()->withCount('permissions');

        $per_page = $request->query('per_page') ? $request->query('per_page') : 10;
        $sortBy = $request->query('sortBy');

        if ($request->query('search_key')) {
            $roles->where("name", 'LIKE', "%" . $request->query('search_key') . "%");
        }

        if ($sortBy) {
            foreach ($sortBy as $key => $sort) {
                $roles->orderBy($sort['key'], $sort['order']);
            }
        }

        return $roles->paginate($per_page);
    }

    public function getAll()
    {
        return Role::all();
    }

    public function store(Request $request)
    {
        $this->authorize('create', Role::class);

        $input = $request->all();

        $validator = Validator::make($input, [
            'name' => 'required',
            'detail' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $role = Role::create($input);
        $role->permissions()->attach($request->permission_ids);

        return $this->sendResponse(new RoleResource($role), 'Role created successfully.');
    }

    public function show($id)
    {
        $this->authorize('viewAny', Role::class);

        $role = Role::find($id);

        if (is_null($role)) {
            return $this->sendError('Role not found.');
        }

        return $this->sendResponse(new RoleResource($role), 'Role retrieved successfully.');
    }

    public function getPermissions()
    {
        return Permission::all();
    }

    public function update(Request $request, Role $role)
    {
        $this->authorize('update', Role::class);

        $input = $request->all();

        $validator = Validator::make($input, [
            'name' => 'required',
            'detail' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $role->name = $input['name'];
        $role->detail = $input['detail'];
        $role->save();
        $role->permissions()->sync($request->permission_ids);


        return $this->sendResponse(new RoleResource($role), 'Role updated successfully.');
    }

    public function destroy(Role $role)
    {
        $this->authorize('delete', Role::class);

        $role->delete();

        return $this->sendResponse([], 'Role deleted successfully.');
    }
}
