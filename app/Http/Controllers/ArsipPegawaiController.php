<?php

namespace App\Http\Controllers;

use App\Models\ArsipPegawai;
use App\Models\Pegawai;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ArsipPegawaiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       return Pegawai::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'pegawai_id' => 'required',
            'filename' => 'required'
            
        ]);
        
        $fields = $request->all();
        
        if ($request->hasFile('upl')){
            $path = $request->file('upl')->store('arsip-pegawai');
            $fields['storagepath'] = $path;
        }

      
        return ArsipPegawai::create($fields);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ArsipPegawai  $arsipPegawai
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $hasil = ArsipPegawai::where('pegawai_id','=',$id)->get();
        return !$hasil ? response([],200) : response($hasil,200);
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ArsipPegawai  $arsipPegawai
     * @return \Illuminate\Http\Response
     */
    public function edit(ArsipPegawai $arsipPegawai)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ArsipPegawai  $arsipPegawai
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$id,$upload_id)
    {
        $request->validate([
            'title' => 'required',
            'filename' => 'required'
            
        ]);
        
        $fields = $request->all();
        
        $arsip = ArsipPegawai::where('pegawai_id',$id)->where('id',$upload_id)->get();
        
        if (count($arsip)<=0) {
            return response('empty arsip...',400);
        }

        if ($request->hasFile('upl')){
            
            $s = Storage::delete($arsip[0]->storagepath);
            
            $path = $request->file('upl')->store('arsip-pegawai');
            $fields['storagepath'] = $path;
        }
        

        

        $arsip[0]->update($fields);
        return response($arsip, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ArsipPegawai  $arsipPegawai
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
       return ArsipPegawai::destroy($id);
    }
}
