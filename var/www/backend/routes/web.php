<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    $users=DB::table('comments')->get();
    $ary=[];
    foreach ($users as $user) {
        $ary[]=[$user->id,$user->name,$user->comment,$user->image,$user->del,$user->edi];
    }
    return $ary;
});



//確認用
$router->get('users','UserController@show');

$router->post('users/rows', 'UserController@yourid');
$router->post('users/insert','UserController@insert');
$router->post('users/login','UserController@login');
$router->post('users/delete','UserController@delete');
$router->post('users/token', 'UserController@token');


$router->group(
    ['prefix' => 'comment'],
    function () use ($router) {
        //管理者用
        $router->get('deleteall','CommController@deleteall');
        $router->get('','CommController@index');

        $router->post('show', 'CommController@show');
        $router->post('rows', 'CommController@yourid');
        $router->post('insert', 'CommController@insert');
        $router->post('delete','CommController@delete');
        $router->post('edit','CommController@edit');
        $router->post('image','CommController@image');
        //セッションの実験
        $router->get('session', 'CommController@sess');
        $router->get('delsession', 'CommController@delsession');
    }
);

