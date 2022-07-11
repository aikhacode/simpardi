<?php

use App\Http\Controllers\PegawaiController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use App\Models\Arsip;
use App\Models\SuratMasuk;
use Illuminate\Http\Request;

use Barryvdh\DomPDF\Facade\Pdf;

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

Route::get('upload/arsip', function (Request $request)
{
	$storagepath = base64_decode($request->input('arsip'));
	// return $storagepath;

    $arsip = Arsip::where('storagepath',$storagepath)->get();

    // return response($arsip);
    if ($arsip)
    {
    	 $path = public_path($storagepath);
		       	        
       
	    if (!File::exists($path)) {
	        abort(404);
	    
	    }

	    return response()->download($path,$arsip[0]->filename);
	    // return response()->file($path);
    } else {
    	abort(404);

    }

   
   
});

Route::get('/print/disposisi/{id}', function ($id){
	$surat = SuratMasuk::find($id);
	$surat->disposisis;

	$pdf = Pdf::loadview('disposisi',['data'=> $surat->disposisis]);
	return $pdf->stream();
	// $pdf = App::make('dompdf.wrapper');
    // $pdf->loadHTML('<h1>Test</h1>');
    // return $pdf->stream();
});

Route::get('/preview/disposisi/{id}', function ($id){
	$surat = SuratMasuk::find($id);
	$surat->disposisis;

	return view('disposisi',['data'=>$surat->disposisis]);
});