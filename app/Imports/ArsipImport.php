<?php

namespace App\Imports;

use App\Models\Arsip;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ArsipImport implements ToModel, WithHeadingRow {
	/**
	 * @param array $row
	 *
	 * @return \Illuminate\Database\Eloquent\Model|null
	 */
	public function model(array $row) {
		return new Arsip([
			'title' => $row['title'],
			'filename' => $row['filename'],
			'storagepath' => $row['storagepath'],
			'arsipable_type' => $row['arsipable_type'],
			'arsipable_id' => $row['arsipable_id'],
			
			
		]);
	}
}
