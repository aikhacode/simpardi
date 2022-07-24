<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pegawai extends Model {
	use HasFactory;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array<int, string>
	 */
	protected $fillable = [
		'nik', 'nip', 'nama', 'sex', 'status', 'pangkat', 'gol', 'jabatan_anjab',
		'tmt_skcpns', 'tmt_pensiun', 'pendidikan', 'perguruan_tinggi',
		'tahun_lulus', 'sip_sipb', 'tgl_sip_sipb', 'tgl_sip_sipb_berlaku', 'no_str', 'tgl_str', 'tgl_str_berlaku',
	];

	public function arsips() {
		return $this->hasMany(ArsipPegawai::class, 'pegawai_id');
	}
}
