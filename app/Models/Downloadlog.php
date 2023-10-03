<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Downloadlog extends Model
{
    use HasFactory;

    
    protected $fillable = [
        'downloader','program','no_sk','title'    ];
}
