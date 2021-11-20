<?php

namespace App\Http\Middleware;
use Closure;

class CorsMiddleware
{
    //理解していないがこれがないとCORSエラーが出る。
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // TODO:Access-Control-Allow-Originを適切に指定する必要がある
        $headers = [
            'Access-Control-Allow-Origin'      => '*',
            'Access-Control-Allow-Methods'     => 'POST, GET, OPTIONS', // TODO:この部分も適切に設定する必要がある
            //'Access-Control-Allow-Methods'     => '*',
            'Access-Control-Allow-Credentials' => 'true',
            'Access-Control-Max-Age'           => '86400',
            //'Access-Control-Allow-Headers'     => 'Content-Type, Authorization, X-Requested-With'
            'Access-Control-Allow-Headers'     => '*'
        ];

        // preflightリクエスト用
        if ($request->isMethod('OPTIONS'))
        {
            return response()->json('{"method":"OPTIONS"}', 200, $headers);
        }

        $response = $next($request);
        foreach($headers as $key => $value)
        {
            $response->header($key, $value);
        }

        return $response;
    }
}