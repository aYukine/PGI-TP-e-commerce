<?php

namespace App\Policies;

use App\Models\Product;
use App\Models\User;

class ProductPolicy
{
    public function viewAny(User $user): bool
    {
        return true; // Anyone can view product list
    }

    public function view(User $user, Product $product): bool
    {
        // Admin can view all products
        if ($user->hasRole('admin')) return true;
        
        // Manager can view products they created or in their categories
        if ($user->hasRole('manager')) {
            return $product->created_by === $user->id;
        }
        
        // Staff can only view products assigned to them
        if ($user->hasRole('staff')) {
            return $product->assigned_to === $user->id;
        }
        
        return false;
    }

    public function create(User $user): bool
    {
        return $user->hasPermission('products.create');
    }

    public function update(User $user, Product $product): bool
    {
        // Admin can update any product
        if ($user->hasRole('admin')) return true;
        
        // Manager can update their own products
        if ($user->hasRole('manager')) {
            return $product->created_by === $user->id && $user->hasPermission('products.update');
        }
        
        // Staff can only update status of assigned products
        if ($user->hasRole('staff')) {
            return $product->assigned_to === $user->id;
        }
        
        return false;
    }

    public function delete(User $user, Product $product): bool
    {
        // Only admin and managers who created the product can delete
        if ($user->hasRole('admin')) return true;
        
        return $user->hasRole('manager') && $product->created_by === $user->id;
    }

    public function updateStatus(User $user, Product $product): bool
    {
        // Staff can update status of assigned products
        return $user->hasRole('staff') && $product->assigned_to === $user->id;
    }
}
