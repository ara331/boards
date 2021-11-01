<?php
//https://qiita.com/kiyc/items/aaa37a46d77d559d65c4#jwt%E3%81%A8%E3%81%AF
//飯野さんが使ってたやつっぽい。これをベースにjwtでの認証を行うやり方を考えてみてもよい。
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\User;
use Lcobucci\JWT\Builder;
use Lcobucci\JWT\Signer\Hmac\Sha256;

use Illuminate\Support\Facades\DB;
use App\Post;


//Userは使わなくてもいいかも？
class AuthController extends Controller
{
    private function jwt($id)
    {
        $signer = new Sha256();
        $token = (new Builder())->setIssuer('http://localhost:8000')
            ->setAudience('http://localhost:8000')
            ->setId(uniqid(), true)
            ->setIssuedAt(time())
            ->setNotBefore(time() + 60)
            ->setExpiration(time() + 3600)
            ->set('uid', $id)
            ->sign($signer, env('JWT_SECRET'))
            ->getToken();

        return $token;
    }

    public function authenticate(Request $request)
    {
        //validate関数はBaseControllerの関数である。
        //しかしそれはlaravelの話。lumenではどうなのかは分からない。
        //thisはそういう意味。自分を使ってContorollerのメソッドを使用している。
        //このvalidate関数は$requestの正当性を保つもの
        //例えばrequiredなら値を持つことが求められる。
        /*
        $this->validate($request, [
            'id'    => 'required|id',
            'password' => 'required'
        ]);*/
        $id=$request['id'];
        $pass=$request['pass'];
        $user = DB::table('user')->where('id',$id)->first();
        if (!$user) {
            return response()->json(['error' => 'ログインできませんでした。'], 400);
        }
        //passを最初からハッシュして（Hash::make()）をしておけばここで、hashは使える。
        //今回は一旦無視
        if ($pass==$user->pass) {
            return response()->json($this->jwt($user->id)->__toString(), 200);
        }
        return response()->json(['error' => 'ログインできませんでした。'], 400);
    }
}