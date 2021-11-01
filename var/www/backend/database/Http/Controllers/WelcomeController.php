<?php

namespace App\Http\Controllers;
//よくわからない。
//namespaseは必要だし、ファイルの名前も適切じゃないといけないみたい。
//さらにクラスの名前も適切じゃないといけないみたい。
//viewは個別の定義が必要そう
use Illuminate\Support\Facades\DB;
use App\Post;
use Illuminate\Http\Request;

class WelcomeController
{
    public function index($id){
        return $id;
    }

    public function all(){
        $users = DB::table('comments')->get();
        return $users;
    }

    public function select_name($name){
        $user = DB::table('a')->where('name',$name)->first();
        $age=$user->age;
        return $age;
    }
    public function a(){
        //$posts = Post::all();
        //return response()->json(['name' => 'arai','age' =>'23']);
        $user = DB::table('a')->where('name','arai')->first();
        $age=$user->age;
        //$age='23';
        return ['arai',$age];
    }
}