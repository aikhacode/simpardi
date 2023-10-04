<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model {
	use HasFactory;

	protected $fillable = [
		'type', 'category', 'tgl_terbit', 'title', 'no_sk', 'tahun','id'
	];

	public function arsips() {
		return $this->morphMany(Arsip::class, 'arsipable');
	}
}
