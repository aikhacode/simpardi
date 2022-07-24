<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {
	/**
	 * Seed the application's database.
	 *
	 * @return void
	 */
	public function run() {
		// \App\Models\User::factory(1)->create();
		//    \App\Models\Pegawai::factory(10)->create();
		\App\Models\User::create([
			'name' => 'Test',
			'email' => 'test@sipardi.ujung',
			'email_verified_at' => now(),
			'role' => 'user',
			'password' => bcrypt('12345'), // password
			'remember_token' => \Illuminate\Support\Str::random(10),

		]);
		\App\Models\User::create([
			'name' => 'Admin',
			'email' => 'admin@sipardi.ujung',
			'email_verified_at' => now(),
			'role' => 'Admin',
			'password' => bcrypt('12345'), // password
			'remember_token' => \Illuminate\Support\Str::random(10),

		]);

		//pegawai import
		\Maatwebsite\Excel\Facades\Excel::import(new \App\Imports\PegawaisImport, \Illuminate\Support\Facades\Storage::path('seeder/pegawai-import22.xlsx'));

		\Maatwebsite\Excel\Facades\Excel::import(new \App\Imports\CategoriesImport, \Illuminate\Support\Facades\Storage::path('seeder/category.xlsx'));

	}
}
