<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Arsip extends Model
{
    use HasFactory;

    protected $fillable = [
        'title','filename','storagepath','arsipable_type','arsipable_id'
    ];

    public function arsipable()
    {
        return $this->morphTo();
    }
}
