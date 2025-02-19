<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CategoryController extends Controller {
	public function index() {
		return \App\Models\Category::orderBy('type')->get();
	}

	public function byType($type) {
		return \App\Models\Category::where('type', $type)->get();
	}

	public function create(Request $request) {
		$fields = $request->all();
		return \App\Models\Category::create($fields);
	}

	public function update(Request $request, $id) {
		$cat = \App\Models\Category::find($id);
		return $cat->update($request->all());
	}

	public function destroy($id) {
		return \App\Models\Category::destroy($id);
	}

}
