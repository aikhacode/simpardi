<?php

namespace App\Http\Controllers;

use App\Models\Tipesurat;
use Illuminate\Http\Request;

class TipesuratController extends Controller {
	public function index() {
		return Tipesurat::orderBy('tipe')->get();
	}

	public function create(Request $request) {
		$fields = $request->all();

		return Tipesurat::create($fields);
	}

	public function update(Request $request, $id) {
		$tipe = Tipesurat::find($id);
		return $tipe->update($request->all());
	}

	public function destroy($id) {

		return Tipesurat::destroy($id);
	}

}
