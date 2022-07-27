<?php

namespace App\Imports;

use App\Models\Tipesurat;
use Maatwebsite\Excel\Concerns\ToModel;

// use Maatwebsite\Excel\Concerns\WithHeadingRow;

class TipesuratsImport implements ToModel {
	/**
	 * @param array $row
	 *
	 * @return \Illuminate\Database\Eloquent\Model|null
	 */
	public function model(array $row) {
		return new Tipesurat([
			'tipe' => $row[0],
			'template' => $row[1],

		]);
	}
}
