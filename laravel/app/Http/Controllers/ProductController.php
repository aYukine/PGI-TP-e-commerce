<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function getProducts() {
        return ["message" => "Getting list of products"];
    }

    public function createProduct() {
        return ["message" => "Creating a new product"];
    }

    public function getProduct($productId) {
        return ["message" => "Getting 1 product base on given productId"];
    }

    public function updateProduct($productId) {
        return ["message" => "Updating 1 product base on given productId"];
    }

    public function deleteProduct($productId) {
        return ["message" => "Deleting 1 product base on given productId"];
    }

    public function getProductsByCategory($categoryId) {
        return ["message" => "Getting list of products base on given categoryId"];
    }
}
