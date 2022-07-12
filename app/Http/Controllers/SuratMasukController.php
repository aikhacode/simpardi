<?php

namespace App\Http\Controllers;

use App\Models\Arsip;
use App\Models\Disposisi;
use App\Models\SuratMasuk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SuratMasukController extends Controller {
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index() {
		$res = SuratMasuk::get();

		foreach ($res as &$key) {
			// code...
			$key->tgl_surat = \Carbon\Carbon::parse($key->tgl_surat)->format('d-m-Y');
			$key->tgl_surat_masuk = \Carbon\Carbon::parse($key->tgl_surat_masuk)->format('d-m-Y');
			$a = $key->disposisis;
			$b = $key->arsips;
		}

		return $res;
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function create() {
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request) {
		$request->validate([
			'no_surat' => 'required',
			'tgl_surat' => 'required',
			'tgl_surat_masuk' => 'required',
			'no_agenda' => 'required',
			'perihal' => 'required',
			'pengirim' => 'required',

		]);

		$fields = $request->all();

		$surat = SuratMasuk::create($fields);

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
	 * @param  \App\Models\SuratMasuk  $suratMasuk
	 * @return \Illuminate\Http\Response
	 */
	public function show(SuratMasuk $suratMasuk) {
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  \App\Models\SuratMasuk  $suratMasuk
	 * @return \Illuminate\Http\Response
	 */
	public function disposisiStore(Request $request, $id) {
		$fields = $request->all();
		$surat = SuratMasuk::find($id);
		$surat->disposisi;

		$disposisi = new Disposisi;
		$disposisi->dari = $fields['dari'];
		$disposisi->tgl_surat = $fields['tgl_surat'];
		$disposisi->no_surat = $fields['no_surat'];
		$disposisi->perihal = $fields['perihal'];
		$disposisi->no_agenda = $fields['no_agenda'];
		$disposisi->tgl_terima = $fields['tgl_terima'];
		Disposisi::where('no_surat', $fields['no_surat'])->where('disposisiable_type', 'App\Models\SuratMasuk')->delete();
		$res = $surat->disposisis()->save($disposisi);

		$a = $surat->disposisis;

		return response($surat, 200);

	}

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

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \App\Models\SuratMasuk  $suratMasuk
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, $id) {
		$request->validate([
			'no_surat' => 'required',
			'tgl_surat' => 'required',
			'tgl_surat_masuk' => 'required',
			'no_agenda' => 'required',
			'perihal' => 'required',
			'pengirim' => 'required',

		]);

		$fields = $request->all();

		$surat = SuratMasuk::find($id);
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

		$surat = SuratMasuk::find($id);
		$surat->arsips;

		$surat->update($request->all());
		return response($surat, 200);
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \App\Models\SuratMasuk  $suratMasuk
	 * @return \Illuminate\Http\Response
	 */
	public function destroy($id) {
		$arsips = SuratMasuk::find($id)->arsips;
		foreach ($arsips as $key) {
			Storage::delete($key->storagepath);
			$key->delete();
		}
		return SuratMasuk::destroy($id);
	}
}
