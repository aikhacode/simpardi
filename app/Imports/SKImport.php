<?php

namespace App\Imports;

use App\Models\Document;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class SKImport implements ToModel, WithHeadingRow {
	/**
	 * @param array $row
	 *
	 * @return \Illuminate\Database\Eloquent\Model|null
	 */
	public function model(array $row) {
		return new Document([
			'type' => $row['type'],
			'tahun' => $row['tahun'],
			'category' => $row['category'],
			'title' => $row['title'],
			'no_sk' => $row['no_sk'],
			'id' => $row['id']
			
			
		]);
	}
}
