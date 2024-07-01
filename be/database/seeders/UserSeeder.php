<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRoleId = Role::first()->id;
        $employeeRoleId = Role::where('name', 'Employee')->first()->id;

        User::create([
            'name' => 'John',
            'username' => 'john_doe',
            'password' =>  bcrypt(123123),
            'role_id' => $adminRoleId,
        ]);

        User::factory(10)->create(['role_id' => $employeeRoleId]);
    }
}
