<?php

use App\Http\Controllers\ArsipPegawaiController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\PegawaiController;
use App\Http\Controllers\SuratKeluarController;
use App\Http\Controllers\SuratMasukController;
use App\Http\Controllers\TipeSuratController;
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

Route::get('/upload/arsip', function (Request $request) {
	$storagepath = base64_decode($request->input('arsip'));
	// return $storagepath;

	$arsip = Arsip::where('storagepath', $storagepath)->get();

	// return response($arsip);
	if ($arsip) {
		$path = storage_path('app/' . $storagepath);

		if (!file_exists($path)) {

			response('no exist', 401);

		}

		// return response()->download($path, $arsip[0]->filename);
		// $url = Storage::copy($path, public_path('arsip/' . $storagepath));
		return response()->file($path);
	} else {
		response('no exist', 401);

	}

});

Route::get('/suratkeluar/agendano', [SuratKeluarController::class, 'agenda_nok']);
Route::get('/bro', [AuthController::class, 'index']);

// Protected routes
Route::group(['middleware' => ['auth:sanctum']], function () {
	Route::get('/tipesurat', [TipesuratController::class, 'index']);
	Route::post('/tipesurat', [TipesuratController::class, 'create']);
	Route::put('/tipesurat/{id}', [TipesuratController::class, 'update']);
	Route::delete('/tipesurat/{id}', [TipesuratController::class, 'destroy']);

	Route::delete('/bro/delete/{email}', function (Request $request, $email) {
		$f = $request->all();
		$usr = \App\Models\User::where('email', '=', $email)->delete();
		return response([$usr, $email, $f]);

	});
	// Route::get('/bro', [AuthController::class, 'index']);
	Route::post('/bro/update', function (Request $request) {
		$request->validate([
			'name' => 'required',
			'email' => 'required|email',
			'password' => 'required',
			'password_confirmation' => 'required',
			'role' => 'required',
			'username' => 'required',
		]);

		$fields = $request->all();

		$email = $fields['email'];

		$data = ['name' => $fields['name'], 'username' => $fields['username'],
			'password' => bcrypt($fields['password']),

		];

		if ($fields['mode'] == 'old') {

			$user = DB::table("users")->where('email', '=', $email);

			if (!empty($user)) {
				$ret = true;
				$user->update($data);

			} else {
				$ret = false;
			}
		} elseif ($fields['mode'] == 'new') {
			$user = \App\Models\User::create([
				'name' => $fields['name'],
				'email' => $fields['email'],
				'password' => bcrypt($fields['password']),
				'role' => $fields['role'],
				'username' => $fields['username'],
			]);

			$ret = $fields;
			$token = $user->createToken('myapptoken')->plainTextToken;
		}

		return response($ret, (!empty($user)) ? 200 : 400);

	});

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
	// Route::get('/suratkeluar/agendano', [SuratKeluarController::class, 'agenda_nok']);

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
	Route::get('/suratmasuk/agendano', [SuratMasukController::class, 'agenda_no']);
	Route::post('/suratmasuk', [SuratMasukController::class, 'store']);
	Route::post('/suratmasuk/{id}', [SuratMasukController::class, 'update']);
	Route::delete('/suratmasuk/{id}', [SuratMasukController::class, 'destroy']);
	Route::post('/suratmasuk/disposisi/{id}', [SuratMasukController::class, 'disposisiStore']);

	// internal | eksternal
	Route::get('/document/{type}', [DocumentController::class, 'index']);

	Route::post('/document/{type}', [DocumentController::class, 'store']);
	Route::post('/document/{type}/{id}', [DocumentController::class, 'update']);
	Route::delete('/document/{type}/{id}', [DocumentController::class, 'destroy']);

	Route::get('/categories', [CategoryController::class, 'index']);
	Route::get('/categories/{type}', [CategoryController::class, 'byType']);
	Route::post('/categories', [CategoryController::class, 'create']);
	Route::put('/categories/{id}', [CategoryController::class, 'update']);
	Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

});

Route::middleware('auth:api')->get('/user', function (Request $request) {
	return $request->user();
});
