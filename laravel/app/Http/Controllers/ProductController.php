<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function getProducts() {
        $this->authorize('viewAny', Product::class);
        
        return Product::all();
    }

    public function createProduct(Request $request) {
        $this->authorize('create', Product::class);
        
        $product = Product::create($request->all());
        return $product;
    }

    public function getProduct($productId) {
        $product = Product::findOrFail($productId);
        $this->authorize('view', $product);
        
        return $product;
    }

    public function updateProduct(Request $request, $productId) {
        $product = Product::findOrFail($productId);
        $this->authorize('update', $product);
        
        $product->update($request->all());
        return $product;
    }

    public function deleteProduct($productId) {
        $product = Product::findOrFail($productId);
        $this->authorize('delete', $product);
        
        $product->delete();
        return response()->json(['message' => 'Product deleted']);
    }

    public function getProductsByCategory($categoryId) {
        return Product::where('category_id', $categoryId)->get();
    }
}