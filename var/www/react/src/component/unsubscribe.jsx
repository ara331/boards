import React, {useState} from 'react';
import axios from 'axios';


//退会機能



function Unsubscribe(props){
    const [sub, setSub] = useState(''); 
    const [Pass, setPass] =useState('');
    const [id, setId] = useState(props.id);
    //このページ専用のページ遷移
    const [Page, setPage] = useState(false);


    //削除リクエスト
    function deleteuser(){
        setSub('送信中');
        const data=[id,Pass];
        axios.post('http://localhost:8000/users/delete',data)
        .then((request) => {
            setSub(request.data);
            if (request.data==='削除成功'){
                setPage(true);
            }
        })                             //成功した場合
        .catch(() => {
            setSub('通信失敗');
        }); 
    }

    function handleChange(e){
        if(e.target.name === 'pass') {
            setPass(e.target.value);
        }
    }
    if (Page===false){
        return (
            <>
                本当に退会しますか？<br />
                <form>
                パスワード
                <input type="password" name="pass" value={Pass} onChange={handleChange} />
                <br />
                <input type="button" value="退会" onClick={deleteuser}/>
                </form>
                <br />
                送信状態：{sub}
                <br />
                <br />
                <button onClick={props.login}>
                    戻る
                </button>

            </>
        );
    }else{
        return (
            <>
                退会が完了しました<br /><br />
                <button onClick={props.logout}>ログインページに戻る</button>
            </>
        )
    }
    
}

export default Unsubscribe;