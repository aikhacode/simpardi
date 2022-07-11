<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArsipPegawai extends Model
{
    use HasFactory;

    protected $fillable = [
        'title','pegawai_id','filename','storagepath'
    ];

    public function pegawais()
    {
        return $this->belongsTo(Pegawai::class,'pegawai_id');
    }
}
