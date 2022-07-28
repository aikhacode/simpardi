<?php

use App\Models\Arsip;
use App\Models\SuratKeluar;
use App\Models\SuratMasuk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

Route::get('/', function () {
	return redirect('/app');
	// return view('welcome');
});

Route::get('/upload/arsip', function (Request $request) {
	$storagepath = base64_decode($request->input('arsip'));
	// return $storagepath;

	$arsip = Arsip::where('storagepath', $storagepath)->get();

	// return response($arsip);
	if ($arsip) {
		$path = storage_path('app/' . $storagepath);

		if (!file_exists($path)) {

			abort(404);

		}

		// return response()->download($path, $arsip[0]->filename);
		return response()->file($path);
	} else {
		abort(404);

	}

});

Route::get('/upload/arsip/download', function (Request $request) {
	$storagepath = base64_decode($request->input('arsip'));
	// return $storagepath;

	$arsip = Arsip::where('storagepath', $storagepath)->get();

	// return response($arsip);
	if ($arsip) {
		$path = storage_path('app/' . $storagepath);

		if (!file_exists($path)) {

			abort(404);

		}

		return response()->download($path, $arsip[0]->filename);
	} else {
		abort(404);

	}

});

Route::get('/print/disposisi/{id}', function ($id) {
	$surat = SuratMasuk::find($id);
	$surat->disposisis;

	$pdf = \Barryvdh\DomPDF\Facade\Pdf::loadview('disposisi', ['data' => $surat->disposisis]);
	return $pdf->stream();

	// $pdf = App::make('dompdf.wrapper');
	// $pdf->loadHTML('<h1>Test</h1>');
	// return $pdf->stream();
	// $pdf = PDF::loadview('disposisi', ['data' => $surat->disposisis]);
	// return $pdf->inline();
});

Route::get('/print/pegawai', function (Request $request) {});

Route::get('/print/suratmasuk', function (Request $request) {
	$periode = array('start' => $request->query('start'), 'end' => $request->query('end'));
	$from = date($periode['start']);
	$to = date($periode['end']);

	$surat = SuratMasuk::whereBetween('tgl_surat_masuk', [$from, $to])->get();
	// $surat->disposisis;
	$list = [];
	$no = 1;
	foreach ($surat as $key) {
		$list[] = array(
			'no' => $no++,
			'tgl_surat_masuk' => \Carbon\Carbon::parse($key['tgl_surat_masuk'])->format('d F Y'),
			'no_agenda' => $key['no_agenda'],
			'no_surat' => $key['no_surat'],
			'tgl_surat' => \Carbon\Carbon::parse($key['tgl_surat'])->format('d F Y'),
			'pengirim' => $key['pengirim'],
			'perihal' => $key['perihal'],
			'diteruskan' => '',
			'catatan' => '',

		);
	}

	$header = array(
		['No', 'no'],
		['Tanggal Diterima', 'tgl_surat_masuk'],
		['No Agenda', 'no_agenda'],
		['No Surat', 'no_surat'],
		['Tgl Surat', 'tgl_surat'],
		['Pengirim', 'pengirim'],
		['Perihal', 'perihal'],
		['Diteruskan ke', 'diteruskan'],
		['Catatan Disposisi', 'catatan'],
		// ['paraf', 'paraf']
	);

	$judul = 'PERIODE ' . \Carbon\Carbon::parse($from)->format('d F Y') . ' S/D ' . \Carbon\Carbon::parse($to)->format('d F Y');

	$pdf = \Barryvdh\DomPDF\Facade\Pdf::loadview('suratmasuk',
		['data' => $list,
			'periode' => $judul,
			'header' => $header,
		]);
	return $pdf->stream();
	// return view('suratmasuk',
	// 	['data' => $list,
	// 		'periode' => $judul,
	// 		'header' => $header,
	// 	]);

	// $pdf = App::make('dompdf.wrapper');
	// $pdf->loadHTML('<h1>Test</h1>');
	// return $pdf->stream();
	// $pdf = PDF::loadview('disposisi', ['data' => $surat->disposisis]);
	// return $pdf->inline();
});

Route::get('/print/suratkeluar', function (Request $request) {
	$periode = array('start' => $request->query('start'), 'end' => $request->query('end'));
	$from = date($periode['start']);
	$to = date($periode['end']);

	$surat = SuratKeluar::whereBetween('tgl_surat', [$from, $to])->get();
	// $surat->disposisis;
	$list = [];
	$no = 1;
	foreach ($surat as $key) {
		$list[] = array(
			'no' => $no++,
			'tgl_surat' => \Carbon\Carbon::parse($key['tgl_surat_masuk'])->format('d F Y'),
			'no_surat' => $key['no_surat'],
			'no_agenda' => $key['no_agenda'],
			'perihal' => $key['perihal'],
			'tujuan' => $key['tujuan'],

		);
	}

	$header = array(
		['No', 'no'],
		['Tanggal Surat', 'tgl_surat'],
		['No Surat', 'no_surat'],
		['No Agenda', 'no_agenda'],
		['Perihal', 'perihal'],
		['Tujuan', 'tujuan'],

		// ['paraf', 'paraf']
	);

	$judul = 'PERIODE ' . \Carbon\Carbon::parse($from)->format('d F Y') . ' S/D ' . \Carbon\Carbon::parse($to)->format('d F Y');

	$pdf = \Barryvdh\DomPDF\Facade\Pdf::loadview('suratkeluar',
		['data' => $list,
			'periode' => $judul,
			'header' => $header,
		]);
	return $pdf->stream();
	// return view('suratmasuk',
	// 	['data' => $list,
	// 		'periode' => $judul,
	// 		'header' => $header,
	// 	]);

	// $pdf = App::make('dompdf.wrapper');
	// $pdf->loadHTML('<h1>Test</h1>');
	// return $pdf->stream();
	// $pdf = PDF::loadview('disposisi', ['data' => $surat->disposisis]);
	// return $pdf->inline();
});

Route::get('/print/disposisi/{id}', function ($id) {
	$surat = SuratMasuk::find($id);
	$surat->disposisis;

	// return Storage::get($surat->disposisis->ttd);

	// $storagepath = storage_path('app/' . $disp->ttd);

	// if (!file_exists($storagepath)) {

	// 	return response(['no exist', $storagepath], 401);

	// }

	// return response()->download($path, $arsip[0]->filename);
	// return response()->file($storagepath);
	// $ttd = 'data:image/png;base64,' . base64_encode(Storage::get($surat->disposisis->ttd));
	$ttd = base64_encode(Storage::get($surat->disposisis->ttd));

	$teruskan = json_decode($surat->disposisis->teruskan, true);

	$pdf = \Barryvdh\DomPDF\Facade\Pdf::loadview('disposisi', [
		'data' => $surat->disposisis,
		'teruskan' => $teruskan,
		'ttd' => $ttd,
	]);
	return $pdf->stream();
});