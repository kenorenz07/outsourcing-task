<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::upsert([
            ['name' => 'Admin', 'detail' => 'This is admin role'],
            ['name' => 'Employee', 'detail' => 'This is Employee role'],
        ], ['name'], ['detail']);

        $adminPermissions = Permission::pluck('id')->toArray();
        $employeePermissions = Permission::where('slug', 'view-tasks')->pluck('id')->toArray();

        $admin = Role::where('name', 'Admin')->first();
        $admin->permissions()->attach($adminPermissions);

        $admin = Role::where('name', 'Employee')->first();
        $admin->permissions()->attach($employeePermissions);
    }
}
