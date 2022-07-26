<?php

namespace App\Http\Controllers;

use App\Models\Arsip;
use App\Models\SuratKeluar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SuratKeluarController extends Controller {
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index(Request $request) {
		// if ( (is_null($request->input('limit'))) || (is_null($request->input('page'))) ) {
		//     $res =  DB::table('surat_keluars')->get();
		// } else {

		//     $limit = $request->input('limit');
		//     $offset = ($request->input('page') - 1) * $limit;
		//     $res =  DB::table('surat_keluars')->offset($offset)->limit($limit)->get();
		// }

		$res = SuratKeluar::get();

		foreach ($res as &$key) {
			// code...
			$key->tgl_surat = \Carbon\Carbon::parse($key->tgl_surat)->format('d-m-Y');
			$a = $key->arsips;
		}

		return $res;
	}

	public function agenda_nok() {
		$res = SuratKeluar::selectRaw('MAX(id) as max')->get();

		return response($res);
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request) {
		$request->validate([
			'tgl_surat' => 'required',
			'no_agenda' => 'required',
			'perihal' => 'required',
			'tujuan' => 'required',
			'no_surat' => 'required',
		]);

		$fields = $request->all();
		$surat = SuratKeluar::create($fields);

		// return response($surat,200);

		$arsips = $fields['arsips'];

		if ($arsips) {
			foreach ($arsips as $item) {
				// $fname = $keyfile->getClientOriginalName();
				$fname = $item['filename'];
				$tmp = explode(".", $fname);
				// $path =  $keyfile->store('arsip');
				$path = $item['storagepath'];

				$newpath = explode("/", $item['storagepath'])[1];
				Storage::move($item['storagepath'], 'arsip/' . $newpath);

				$arsip = new Arsip;
				$arsip->title = $tmp[0];
				$arsip->filename = $fname;
				$arsip->storagepath = 'arsip/' . $newpath;
				$surat->arsips()->save($arsip);

			}
		}

		$arsip_temp = $surat->arsips;

		return response($surat, 200);
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  \App\Models\SuratKeluar  $suratKeluar
	 * @return \Illuminate\Http\Response
	 */
	public function show($id) {
		$surat = SuratKeluar::find($id);
		$arsips = $surat->arsips;

		// $surat = [ 'suratkeluar' => $tmp, 'arsips' => $arsip];

		return !$surat ? [] : $surat;
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \App\Models\SuratKeluar  $suratKeluar
	 * @return \Illuminate\Http\Response
	 */
	private function findArsip($arsip_obj, $storagepath) {
		$ret = false;
		$i = 0;
		$founded = false;

		while (($i < count($arsip_obj)) && (!$founded)) {
			if ($arsip_obj[$i]->storagepath == $storagepath) {
				$ret = true;
				$founded = true;
			}
			$i++;
		}

		return $ret;
	}

	public function update(Request $request, $id) {
		$request->validate([
			'tgl_surat' => 'required',
			'no_agenda' => 'required',
			'perihal' => 'required',
			'tujuan' => 'required',
			'no_surat' => 'required',
		]);

		$surat = SuratKeluar::find($id);
		$arsips = $surat->arsips;

		$request_arsips = $request->all()['arsips'];

		if ($request_arsips) {
			foreach ($request_arsips as $keyarsip) {
				if (!$this->findArsip($arsips, $keyarsip['storagepath'])) {
					$newpath = explode("/", $keyarsip['storagepath'])[1];
					Storage::move($keyarsip['storagepath'], 'arsip/' . $newpath);

					$add = new Arsip;
					$add->title = explode(".", $keyarsip['filename'])[0];
					$add->filename = $keyarsip['filename'];
					$add->storagepath = 'arsip/' . $newpath;
					$surat->arsips()->save($add);
				}

			}
		}

		$surat = SuratKeluar::find($id);
		$surat->arsips;

		$surat->update($request->all());
		return response($surat, 200);
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \App\Models\SuratKeluar  $suratKeluar
	 * @return \Illuminate\Http\Response
	 */
	public function destroy($id) {
		$arsips = SuratKeluar::find($id)->arsips;
		foreach ($arsips as $key) {
			Storage::delete($key->storagepath);
			$key->delete();
		}
		return SuratKeluar::destroy($id);
	}
}
