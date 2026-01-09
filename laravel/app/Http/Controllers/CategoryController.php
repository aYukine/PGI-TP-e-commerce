<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function getCategories() {
        return Category::all();
    }

    public function createCategory(Request $request) {
        abort_unless(auth()->user()->can('categories.create'), 403);
        
        $category = Category::create($request->all());
        return $category;
    }

    public function getCategory($categoryId) {
        return Category::findOrFail($categoryId);
    }

    public function updateCategory(Request $request, $categoryId) {
        abort_unless(auth()->user()->can('categories.update'), 403);
        
        $category = Category::findOrFail($categoryId);
        $category->update($request->all());
        return $category;
    }

    public function deleteCategory($categoryId) {
        abort_unless(auth()->user()->can('categories.update'), 403);
        
        $category = Category::findOrFail($categoryId);
        $category->delete();
        return response()->json(['message' => 'Category deleted']);
    }
}