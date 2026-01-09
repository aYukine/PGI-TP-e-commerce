<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    public function run(): void
    {
        // Admin
        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
            ]
        );
        $admin->roles()->sync([Role::where('name', 'admin')->first()->id]);

        // Manager
        $manager = User::firstOrCreate(
            ['email' => 'manager@example.com'],
            [
                'name' => 'Manager User',
                'password' => Hash::make('password'),
            ]
        );
        $manager->roles()->sync([Role::where('name', 'manager')->first()->id]);

        // Staff 1
        $staff1 = User::firstOrCreate(
            ['email' => 'staff1@example.com'],
            [
                'name' => 'Staff User 1',
                'password' => Hash::make('password'),
            ]
        );
        $staff1->roles()->sync([Role::where('name', 'staff')->first()->id]);

        // Staff 2
        $staff2 = User::firstOrCreate(
            ['email' => 'staff2@example.com'],
            [
                'name' => 'Staff User 2',
                'password' => Hash::make('password'),
            ]
        );
        $staff2->roles()->sync([Role::where('name', 'staff')->first()->id]);
    }
}