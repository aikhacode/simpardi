<?php

namespace App\Imports;

use App\Models\Pegawai;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class PegawaisImport implements ToModel, WithHeadingRow {
	/**
	 * @param array $row
	 *
	 * @return \Illuminate\Database\Eloquent\Model|null
	 */
	public function model(array $row) {
		return new Pegawai([
			'nik' => $row['nik'],
			'nip' => $row['nip'],
			'nama' => "{$row['nama']}",
			'sex' => $row['sex'],
			'status' => $row['status'],
			'pangkat' => $row['pangkat'],
			'gol' => $row['gol'],
			'jabatan_anjab' => $row['jabatan_anjab'],
			'tmt_skcpns' => $row['tmt_skcpns'] == 0 ? null : $row['tmt_skcpns'],
			'tmt_pensiun' => $row['tmt_pensiun'] == 0 ? null : $row['tmt_pensiun'],
			'pendidikan' => $row['pendidikan'],
			'perguruan_tinggi' => $row['perguruan_tinggi'],
			'tahun_lulus' => $row['tahun_lulus'],
			'sip_sipb' => $row['sip_sipb'],
			'tgl_sip_sipb' => $row['tgl_sip_sipb'] == 0 ? null : $row['tgl_sip_sipb'],
			'tgl_sip_sipb_berlaku' => $row['tgl_sip_sipb_berlaku'] == 0 ? null : $row['tgl_sip_sipb_berlaku'],
			'no_str' => $row['no_str'],
			'tgl_str' => $row['tgl_str'] == 0 ? null : $row['tgl_str'],
			'tgl_str_berlaku' => $row['tgl_str_berlaku'] == 0 ? null : $row['tgl_str_berlaku'],
		]);
	}
}
