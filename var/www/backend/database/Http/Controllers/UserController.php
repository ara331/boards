<?php
//コメント投稿についてのコントローラ
namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use App\Post;
use Illuminate\Http\Request;

//メールのために必要？
use PHPMailer\PHPMailer;

use Illuminate\Support\Facades\Mail;
use  Illuminate\Contracts\Mail\Mailer;
//use Illuminate\Mail\Mailer;
use App\Mail\ContactMail;
use Carbon\Carbon;

class UserController
{
    public function index($id){
        return $id;
    }

    public function insert(Request $request){
        if ($request[0]!='' and $request[1]!='' and $request[2]!='' and $request[3]!=''){
            if (DB::table('user')->where('name', $request[1])->exists()){
                return 'その名前は使われています';
            }else if(DB::table('user')->where('email', $request[2])->exists()){
                return 'そのメールアドレスは使われています';
            }
            $urltoken = hash('sha256', uniqid(rand(), 1));
            $url = "http://localhost:3000?urltoken=" . $urltoken;
            $now = Carbon::now();
            $time =strtotime($now->toDateTimeString());
            DB::table('user')->insert([
                ['id' => $request[0], 'name' => $request[1], 'email' => $request[2], 'pass' => $request[3], 'kari' => 1, 'token'=> $urltoken, 'time'=> $time]
            ]);
            //メールを送る。
            $contact = ['name' =>$request[1], 'url' =>$url];
            $to = [[ 'email' => $request[2],]];
            Mail::to($to)->send(new ContactMail($contact)); // 引数にリクエストデータを渡す
            return '仮登録完了、メールを送信しました。';          
        }else{
            return '全ての項目を埋めてください。';
        }
    }
    public function insertwithoutmail(Request $request){
        if ($request[0]!='' and $request[1]!='' and $request[2]!='' and $request[3]!=''){
            DB::table('user')->insert([
                ['id' => $request[0], 'name' => $request[1], 'email' => $request[2], 'pass' => $request[3], 'kari' => 0]
            ]);
            //メールを送る。
            return '今回だけ、メールなしでの登録。（この機能は本番では消されます。）';          
        }else{
            return '全ての項目を埋めてください。';
        }
    }
    //要素数の取得
    public function yourid(){
        $id = DB::table('user')->count();
        return $id+1;
    }

    public function show(){
        $users=DB::table('user')->get();
        //return gettype($users);
        $ary=[];
        foreach ($users as $user) {
            $ary[]=[$user->id,$user->name,$user->email,$user->pass];
        }
        return $ary;
    }
    

    public function login(Request $request){
        $id = $request[0];
        $pass = $request[1];
        $user= DB::table('user')->where('id',$id)->where('pass',$pass)->where('kari', '!=', -1)->first();
        if ($user){
            //cookieとセッションを使ってうまくやろうと思ったけど分からなかった。
            //$cookie=$request->session()->getId();
            //$request->session()->put(['userid'=>$id,'cookie'=>$cookie]);
            //$data=[1,$id,$user->name,$cookie];
            $data=[1,$id,$user->name];
        }else{
            $data=[0,'idとpassがおかしい',0];
        }
        return $data;
        
    }

    //条件に合うものを消す。
    
    public function delete(Request $request){
        $id=$request[0];
        $pass=$request[1];
        $user= DB::table('user')->where('id',$id)->where('pass',$pass)->first();
        if ($user){
            DB::table('user')->where('id', $id)->update(['kari'=>-1, 'pass'=>'', 'name'=>'']);
            return '削除成功';
        }else{
            return '削除失敗';
        }
    }

    public function mail(){
        $contact = 'arai';
        $to = [[ 'email' => 'a_mamume_84@icloud.com', 'name' => 'Test',]];
        Mail::to($to)->send(new ContactMail($contact)); // 引数にリクエストデータを渡す
        return 'メール送信';
    }

    public function token(Request $request){
        //24時間経過したものを消す。
        $mytime = Carbon::now();
        $time = strtotime($mytime->toDateTimeString()) -86400;
        DB::table('user')->where('kari',1)->where('time', '<', $time)->delete();
        //tokenが一致したら本登録状態に
        $token = $request[0];
        $user = DB::table('user')->where('token', $token)->where('kari',1)->first();
        if ($user){
            //テスト用に消す
            DB::table('user')->where('token', $token)->update(['kari'=>0]);
            DB::table('user')->where('token', $token)->update(['token'=>'']);
            return [1, $user->id, $user->name, $user->pass];
        }else{
            return [0,0,0,0];
        }
    }
}