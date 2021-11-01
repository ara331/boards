<?php
//コメント投稿についてのコントローラ
namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class CommController
{
    //commentのテーブルの表示。getで使う。
    public function index(){
        $users=DB::table('comments')->get();
        $ary=[];
        foreach ($users as $user) {
            $ary[]=[$user->id,$user->name,$user->comment,$user->del,$user->edi];
        }
        return $ary;
    }

    //全部消す為のもの。一個だけ残す。getで使う管理者用
    public function deleteall(){
        DB::table('comments')->where('id','>', 1)->delete();
    }


    //コメント総数の取得
    public function yourid(){
        $id = DB::table('comments')->count();
        return $id+1;
    }

    //commentの取得。postで使う。
    public function show(){
        $users=DB::table('comments')->get();
        $ary=[];
        foreach ($users as $user) {
            $ary[]=[$user->id,$user->name,$user->comment,$user->image,$user->del,$user->edi];
        }
        return $ary;
    }


    //commentの投稿
    public function insert(Request $request){
        if ($request[2]!='' or $request[3]!=''){
            DB::table('comments')->insert([
                ['id' => $request[0], 'name' => $request[1], 'comment' => $request[2], 'image' => $request[3], 'del' => 0, 'edi' =>0]
            ]);
            return 'insert成功';
        }
        return '入力してください。';
    }



    //条件に合うものを消す。
    public function delete(Request $request){
        $id=$request[0];
        $name=$request[1];
        $user=DB::table('comments')->where('id',$id)->where('del',0)->where('name',$name)->first();
        if ($user){
            DB::table('comments')->where('id',$id)->update(['comment'=>'削除済み']);
            DB::table('comments')->where('id',$id)->update(['image'=>'']);
            DB::table('comments')->where('id',$id)->update(['del'=>1]);
            return '削除成功';
        }else{
            return '削除失敗';
        }
    }


    //条件に合うものを編集
    public function edit(Request $request){
        $id=$request[0];
        $comment=$request[1];
        $name=$request[2];
        $check=$request[3];
        $img=$request[4];
        $user=DB::table('comments')->where('id',$id)->where('del',0)->where('name',$name)->first();
        //
        if ($user and ($comment!='' or $check!=0 or $img!='')){
            if ($comment!=''){
                DB::table('comments')->where('id',$id)->update(['comment'=>$comment]);
            }
            if($img!=''){
                DB::table('comments')->where('id',$id)->update(['image'=>$img]);
            }
            if($check==1){
                DB::table('comments')->where('id',$id)->update(['image'=>'']);
                if (DB::table('comments')->where('id',$id)->value('comment')==''){
                    DB::table('comments')->where('id',$id)->update(['comment'=>'削除済み']);
                    DB::table('comments')->where('id',$id)->update(['del'=>1]);
                    return 'コメントも動画像もないので削除しました';
                }
            }
            DB::table('comments')->where('id',$id)->update(['edi'=>1]);
            return '編集成功';
        }else{
            return '何か入力してください';
        }
    }

}