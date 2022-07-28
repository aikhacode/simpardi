<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Disposisi extends Model {
	use HasFactory;

	protected $fillable = [
		'dari', 'tgl_surat', 'no_surat', 'perihal', 'no_agenda', 'tgl_terima', 'ttd', 'isi', 'teruskan',
	];

	public function disposisiable() {
		return $this->morphTo();
	}
}
