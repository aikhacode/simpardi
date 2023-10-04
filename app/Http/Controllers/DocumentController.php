<?php

namespace App\Http\Controllers;

use App\Models\Arsip;
use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller {
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index($type) {
		$doc = (Document::where('type', $type)->orderBy('tahun', 'DESC'));

		$res = $doc->get();

		foreach ($res as &$key) {
			// code...
			
			$key->tgl_terbit = \Carbon\Carbon::parse($key->tgl_terbit)->format('d-m-Y');
			$a = $key->arsips;
		}

		return $res;

	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request, $type) {
		$request->validate([
			'tgl_terbit' => 'required',
			'title' => 'required',
			'type' => 'required',
			'category' => 'required',
		]);

		$fields = $request->all();
		$doc = Document::create($fields);

		// return response($doc,200);

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
				$doc->arsips()->save($arsip);

			}
		}

		$arsip_temp = $doc->arsips;

		return response($doc, 200);
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
	 * Display the specified resource.
	 *
	 * @param  \App\Models\Document  $document
	 * @return \Illuminate\Http\Response
	 */
	public function show(Document $document) {
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \App\Models\Document  $document
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, $type, $id) {
		$request->validate([
			'tgl_terbit' => 'required',
			'title' => 'required',
			'type' => 'required',
			'category' => 'required',
		]);

		$doc = Document::find($id);
		$arsips = $doc->arsips;

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
					$doc->arsips()->save($add);
				}

			}
		}

		$doc = Document::find($id);
		$doc->arsips;

		$doc->update($request->all());
		return response($doc, 200);
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \App\Models\Document  $document
	 * @return \Illuminate\Http\Response
	 */
	public function destroy($type, $id) {
		$arsips = Document::find($id)->arsips;
		foreach ($arsips as $key) {
			Storage::delete($key->storagepath);
			$key->delete();
		}
		return Document::destroy($id);
	}
}
