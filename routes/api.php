<?php

use App\Http\Controllers\ArsipPegawaiController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\PegawaiController;
use App\Http\Controllers\SuratKeluarController;
use App\Http\Controllers\SuratMasukController;
use App\Models\Arsip;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::post('/import-xls', [PegawaiController::class, 'fileImport']);

// Route::get('/pubtry',function(){
//     return response(['data'=>'test data','two'=>'two'],200);
// });

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::get('/arsip',[ArsipController::class,'index']);

//with body
/*
 * no_surat,tgl_surat,no_agenda,perihal,tujuan, upl[] ---> files to be upload if exist
 */
// Route::post('/arsip',[ArsipController::class,'store']);

// Route::put('/arsip',[ArsipController::class,'update']);

// model = arsipable_type App\SuratKeluar <suratkeluar | suratmasuk >
// id = arsipable_id
// Route::delete('/arsip/{model}/{id}');

// Protected routes
Route::group(['middleware' => ['auth:sanctum']], function () {

	// Route::post('/products', [ProductController::class, 'store']);
	// Route::put('/products/{id}', [ProductController::class, 'update']);
	// Route::delete('/products/{id}', [ProductController::class, 'destroy']);
	Route::post('/logout', [AuthController::class, 'logout']);

	Route::post('/pegawai/create', [PegawaiController::class, 'store']);
	Route::put('/pegawai/{id}', [PegawaiController::class, 'update']);
	Route::delete('/pegawai/{id}', [PegawaiController::class, 'destroy']);
	Route::get('/pegawai', [PegawaiController::class, 'index']);
	Route::get('/pegawai/search/{name}', [PegawaiController::class, 'search']);

	Route::get('/arsip/pegawai/{id}', [ArsipPegawaiController::class, 'show']);
	Route::post('/arsip/pegawai', [ArsipPegawaiController::class, 'store']);
	Route::post('/arsip/pegawai/{id}/{upload_id}', [ArsipPegawaiController::class, 'update']);
	Route::delete('/arsip/pegawai/{id}', [ArsipPegawaiController::class, 'destroy']);

	Route::post('/upload', function (Request $request) {

		$files = $request->file('files');
		$data = [];
		foreach ($files as $keyfile) {
			$fname = $keyfile->getClientOriginalName();
			$tmp = explode(".", $fname);
			$path = $keyfile->store('tmp');
			$data[] = ['filename' => $fname, 'storagepath' => $path];
		}

		return response($data, 200);
	});

	Route::delete('/upload', function (Request $request) {

		$deletePath = $request->all()['storagepath'];
		// $status = $deletePath;
		$status = Storage::delete($deletePath);
		$statusarsip = Arsip::where('storagepath', $deletePath)->delete();

		return response(['statusfile' => $status, 'statusarsip' => $statusarsip], 200);
	});

	Route::get('/suratkeluar/{id}', [SuratKeluarController::class, 'show']);

	// ?page=xx&limit=xx
	Route::get('/suratkeluar', [SuratKeluarController::class, 'index']);

	/*
		                // 'tgl_surat' => 'required',
		                // 'no_agenda' => 'required',
		                // 'perihal' => 'required',
		                // 'tujuan' => 'required',
		                // 'no_surat' => 'required'
		                // 'arsips' => array of files data than has been upload
	*/
	Route::post('/suratkeluar', [SuratKeluarController::class, 'store']);
	/*
		                // 'tgl_surat' => 'required',
		                // 'no_agenda' => 'required',
		                // 'perihal' => 'required',
		                // 'tujuan' => 'required',
		                // 'no_surat' => 'required'

	*/
	Route::post('/suratkeluar/{id}', [SuratKeluarController::class, 'update']);
	Route::delete('/suratkeluar/{id}', [SuratKeluarController::class, 'destroy']);

	Route::get('/suratmasuk', [SuratMasukController::class, 'index']);
	Route::post('/suratmasuk', [SuratMasukController::class, 'store']);
	Route::post('/suratmasuk/{id}', [SuratMasukController::class, 'update']);
	Route::delete('/suratmasuk/{id}', [SuratMasukController::class, 'destroy']);
	Route::post('/suratmasuk/disposisi/{id}', [SuratMasukController::class, 'disposisiStore']);

	// internal | eksternal
	Route::get('/document/{type}', [DocumentController::class, 'index']);
	Route::post('/document/{type}', [DocumentController::class, 'store']);
	Route::post('/document/{type}/{id}', [DocumentController::class, 'update']);
	Route::delete('/document/{type}/{id}', [DocumentController::class, 'destroy']);

});

Route::middleware('auth:api')->get('/user', function (Request $request) {
	return $request->user();
});
