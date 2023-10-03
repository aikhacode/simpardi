<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Downloadlog;

class DownloadlogController extends Controller
{
   public function index() {
        return Downloadlog::all();
    }

   public function print(Request $request){
    $periode = array('start' => $request->query('start'), 'end' => $request->query('end'));
	$from = date($periode['start']);
	$to = date($periode['end']);

	$download = Downloadlog::whereBetween('created_at', [$from, $to])->get();
	
	$list = [];
	$no = 1;
	foreach ($download as $key) {
		$list[] = array(
			'no' => $no++,
			'tgl' => \Carbon\Carbon::parse($key['created_at'])->format('d F Y'),
			'title' => $key['title'],
			'no_sk' => $key['no_sk'],
            'program' => $key['program'],
			'downloader' => $key['downloader'],
			

		);
	}

	$header = array(
		['No', 'no'],
		['Tanggal', 'tgl'],
		['Judul Document', 'title'],
		['No Document', 'no_sk'],
		['Program', 'program'],
		['Downloader', 'downloader'],
		
		// ['paraf', 'paraf']
	);

	$judul = 'PERIODE ' . \Carbon\Carbon::parse($from)->format('d F Y') . ' S/D ' . \Carbon\Carbon::parse($to)->format('d F Y');

	$pdf = \Barryvdh\DomPDF\Facade\Pdf::loadview('distribusi',
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
   }

  public function store(Request $request) {
        
        $post = $request->all();
        $create_post['downloader'] = $post['name'];
        $create_post['program'] = $post['program'];
        $create_post['no_sk'] = $post['no_sk'];
        $create_post['title'] = $post['title'];
       
        $res = Downloadlog::create($create_post);
        return response($res,200);
    }
}
