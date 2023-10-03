<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Downloadlog;

class DownloadlogController extends Controller
{
   public function index() {
        return Downloadlog::all();
    }

   public function show_by_date(Request $request){

   }

  public function store(Request $request) {
        
        $post = $request->all();
        $create_post['downloader'] = $post['name'];
        $create_post['program'] = $post['program'];
        $create_post['no_sk'] = $post['no_sk'];
        $create_post['title'] = $post['title'];
       
        $res = Downloadlog::create($create_post);
        return response($res,200);
    }
}
