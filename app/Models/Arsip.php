<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Arsip extends Model
{
    use HasFactory;

    protected $fillable = [
        'title','filename','storagepath'
    ];

    public function arsipable()
    {
        return $this->morphTo();
    }
}
