<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\TaskRequest;
use App\Models\Permission;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends BaseController
{
    // public function index(Request $request)
    // {
    //     $this->authorize('viewAny', Task::class);
    //     $tasks = Task::query();

    //     $sortBy = $request->query('sortBy');

    //     if ($request->query('search_key')) {
    //         $tasks->where("name", 'LIKE', "%" . $request->query('search_key') . "%");
    //     }

    //     if ($sortBy) {
    //         foreach ($sortBy as $key => $sort) {
    //             $tasks->orderBy($sort['key'], $sort['order']);
    //         }
    //     }

    //     return $this->sendResponse($tasks, 'Tasks retrieved successfully.');
    // }

    public function index()
    {
        $this->authorize('viewAny', Task::class);

        $tasks = Task::with('users')->get();

        return $this->sendResponse($tasks, 'Tasks retrieved successfully.');
    }

    public function store(TaskRequest $request)
    {
        $this->authorize('create', Task::class);

        $input = $request->all();

        $task = Task::create(collect($input)->except(['assigned_employees'])->toArray());
        $task->users()->attach($request->assigned_employees);

        return $this->sendResponse($task, 'Task created successfully.');
    }

    public function show($id)
    {
        $this->authorize('viewAny', Task::class);

        $task = Task::find($id);

        if (is_null($task)) {
            return $this->sendError('Task not found.');
        }

        return $this->sendResponse($task, 'Task retrieved successfully.');
    }

    public function getPermissions()
    {
        $permissions = Permission::all();

        return $this->sendResponse($permissions, 'Permissions retrieved successfully.');
    }

    public function update(TaskRequest $request, Task $task)
    {
        $this->authorize('update', Task::class);

        $input = $request->all();

        $task->name = $input['name'];
        $task->description = $input['description'];
        $task->save();
        $task->users()->sync($request->assigned_employees);

        return $this->sendResponse($task->fresh(), 'Task updated successfully.');
    }

    public function destroy(Task $task)
    {
        $this->authorize('delete', Task::class);

        $task->delete();

        return $this->sendResponse([], 'Task deleted successfully.');
    }
}
