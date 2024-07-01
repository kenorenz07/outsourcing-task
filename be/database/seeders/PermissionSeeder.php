<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::upsert([
            ['name' => 'Create users', 'description' => 'User with this role can add users', 'slug' => 'add-users'],
            ['name' => 'Delete users', 'description' => 'User with this role can delete users', 'slug' => 'delete-users'],
            ['name' => 'Edit users', 'description' => 'User with this role can edit users', 'slug' => 'edit-users'],
            ['name' => 'View users', 'description' => 'User with this role can view users', 'slug' => 'view-users'],
            ['name' => 'Create tasks', 'description' => 'User with this role can add tasks', 'slug' => 'add-tasks'],
            ['name' => 'Delete tasks', 'description' => 'User with this role can delete tasks', 'slug' => 'delete-tasks'],
            ['name' => 'Edit tasks', 'description' => 'User with this role can edit tasks', 'slug' => 'edit-tasks'],
            ['name' => 'View tasks', 'description' => 'User with this role can view tasks', 'slug' => 'view-tasks'],
        ], ['name']);
    }
}
