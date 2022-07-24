<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocumentsTable extends Migration {
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up() {
		Schema::create('documents', function (Blueprint $table) {
			$table->id();
			$table->string('type')->default('internal'); // eksternal
			$table->string('tahun')->default('2022');
			// sk , sop , dlll
			$table->string('category');
			$table->string('tgl_terbit');
			// jusul dokument etc: sk gizi bla bla nla
			$table->string('title');
			$table->string('no_sk')->nullable();
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down() {
		Schema::dropIfExists('documents');
	}
}
