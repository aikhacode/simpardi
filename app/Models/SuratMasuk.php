<?php

namespace App\Models;

use App\Models\Disposisi;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SuratMasuk extends Model {
	use HasFactory;

	protected $fillable = [
		'no_surat', 'tgl_surat', 'tgl_surat_masuk', 'no_agenda', 'perihal', 'pengirim', 'disposisi',
	];

	public function disposisis() {
		return $this->morphOne(Disposisi::class, 'disposisiable');
	}

	public function arsips() {
		return $this->morphMany(Arsip::class, 'arsipable');
	}

}
