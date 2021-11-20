<?php

namespace App\Http\Controllers;
//このコントローラーがルーティングで使えるようになるという事？？？？
use Laravel\Lumen\Routing\Controller as BaseController;

class Controller extends BaseController
{
    public function index(){
        return DB::table('a')->get();
    }
}


