<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function getCategories() {
        return ["message" => "Getting list of categories"];
    }

    public function createCategory() {
        return ["message" => "Creating a new category"];
    }

    public function getCategory($categoryId) {
        return ["message" => "Getting 1 category base on given categoryId"];
    }

    public function updateCategory($categoryId) {
        return ["message" => "Updating 1 category base on given categoryId"];
    }

    public function deleteCategory($categoryId) {
        return ["message" => "Deleting 1 category base on given categoryId"];
    }
}