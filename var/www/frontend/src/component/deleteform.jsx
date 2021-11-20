import React, {useState} from 'react';
import axios from 'axios';


//投稿を消す機能。

function DeleteForm(props){

    const [id, setId] = useState('');
    const [sub, setSub] = useState('');

    function handleChange(e){
        setId(e.target.value);
    }
    

    function handleSubmit(e){
       //削除リクエスト

        setSub('送信中');
        const data=[id,props.name];
        axios.post('http://localhost:8000/comment/delete',data)
        .then(response => {
            setSub(response.data);
            props.func();
        })                             //成功した場合
        .catch(() => {
            setSub('送信失敗');
        });
    }
    
    //()はつけたら無限レンダリングになってしまう。
    //打ち込むたびに状態は変化している。じゃあ投稿を押したときは？
    return (
        <>
            <form>
            削除したいコメントid
            <input type="text" name="id" value={id} onChange={handleChange} />
            <br />
            <input type="button" value="削除" onClick={handleSubmit}/>
            </form>
            <br />
            送信状態：{sub}
            <br />
        </>
    );
}

export default DeleteForm;