<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SuratKeluar extends Model
{
    use HasFactory;

    protected $fillable = [
        'no_surat','tgl_surat','no_agenda','perihal','tujuan'
    ];

    public function arsips()
    {
        return $this->morphMany(Arsip::class, 'arsipable');
    }
}
