import React, {useState,useEffect} from 'react';
import axios from 'axios';


//登録。名前とメールアドレスと、パスワード


function Register(props){
    const [id, setId] = useState('取得中');
    const [Name, setName] = useState('');
    const [Mail, setMail] = useState('');
    const [Pass, setPass] = useState('');
    const [sub, setSub] = useState('');
    //このページ専用のページ遷移
    const [Page, setPage] = useState(false);

    //登録する人のidの取得
    useEffect(() => {
        axios.post('http://localhost:8000/users/rows')
        .then(response => {
            setId(response.data);
        })                             //成功した場合、postsを更新する（then）
        .catch(() => {
            console.log('通信に失敗しました');
        });                             //失敗した場合(catch)
    }, [])
    


    function handleChange(e){
        if(e.target.name === 'name') {
            setName(e.target.value);
        } else if (e.target.name === 'mail') {
            setMail(e.target.value);
        }else if (e.target.name === 'pass') {
            setPass(e.target.value);
        }
    }
    
    function handleSubmit(){
        setSub('送信中');
        const data=[id,Name.toString(),Mail.toString(),Pass.toString()];
        axios.post('http://localhost:8000/users/insert',data)
        .then((response) => {
            setSub(response.data);
            if (response.data==='仮登録完了、メールを送信しました。'){
                setId(id+1);
            }
        })                             //成功した場合
        .catch(() => {
            setSub('登録失敗');
        }); 
    }

    
    if (Page===false){
        return (
            <>
                あなたのユーザid：{id}<br />
                <form>
                名前
                <input type="text" name="name" value={Name} onChange={handleChange} />
                <br />
                メールアドレス
                <input type="text" name="mail" value={Mail} onChange={handleChange} />
                <br />
                パスワード
                <input type="password" name="pass" value={Pass} onChange={handleChange} />
                <br />
                <input type="button" value="会員登録"　onClick={handleSubmit}/>
                </form>
                <br />
                送信状態：{sub}
                <br />
                <br />
                <button onClick={props.logout}>
                    戻る
                </button>
            </>
        );
    }else{
        return (
            <>
                登録完了<br /><br />
                <button onClick={props.login}>掲示板に進む</button>
            </>
        );
    }
    
}

export default Register;