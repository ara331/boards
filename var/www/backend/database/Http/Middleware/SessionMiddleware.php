<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Lcobucci\JWT\Parser;
use Lcobucci\JWT\ValidationData;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use App\User;
use Illuminate\Support\Facades\DB;
use App\Post;

class JwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $id = $request->get('userid');
        $cookie = $request->get('cookie');
        if ($cookie){
            
        }
        if (!$token) {
            return response()->json([
                'error' => 'Token not provided.'
            ], 401);
        }

        $signer = new Sha256();
        $data = new ValidationData();
        $data->setIssuer('http://localhost:8000');
        $data->setAudience('http://localhost:8000');
        $data->setCurrentTime(time() + 60);

        try {
            $token = (new Parser())->parse((string) $token);
            if (!$token->validate($data)) {
                throw new Exception('validation error');
            }
            //最後の方の署名が間違っている時。
            if (!$token->verify($signer, env('JWT_SECRET'))) {
                throw new Exception('sign error');
            }

            $user = DB::table('user')->where('id',$token->getClaim('uid'))->first();

        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }

        $request->user = $user;

        return $next($request);
    }
}