<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use App\Post;
use Illuminate\Http\Request;

class ApiController
{
    public function index($id){
        return $id;
    }

    public function newtable(){
        $users = DB::table('a')->get();
        return $users;
    }

    public function insert(){
        DB::table('a')->insert([
            ['name' => 'sato', 'age' => 13],
            ['name' => 'ito', 'age' => 12]
        ]);
        return DB::table('a')->get();
    }
    public function update(){
        DB::table('a')
            ->where('name', 'arai')
            ->update(['age' => 30]);
        return DB::table('a')->get();
    }
    public function user(Request $request){
        //return 'aaaa';
        return response()->json($request->user->name, 200);
    }
}