import React, {useState} from 'react';
import axios from 'axios';

//ログインを行うところ

function Login(props){

    const [id, setId] = useState('');
    const [Pass, setPass] = useState('');
    
    function handleChange(e){
        if(e.target.name === 'id') {
            setId(e.target.value);
        } else if (e.target.name === 'pass') {
            setPass(e.target.value);
        }
    }
    
    function handleSubmit(){
        props.message('送信中');
        const data=[id,Pass.toString()];
        console.log(data);
        axios.post('http://localhost:8000/users/login',data)
        .then(response => {
            console.log(response.data);
            if (response.data[0]===1){
                //ログインする
                props.func();
                console.log('login成功');
                //idと名前を引き継ぐ
                //idはフォームの入力、名前はresponse
                props.id(id);
                props.name(response.data[2]);
                props.message('login成功');
                props.cookie(id,Pass);
            }else{
                props.message('login失敗');
            }
        })                             //成功した場合
        .catch(() => {
            props.message('login失敗');
        }); 
    }
    
    return (
        <>
            <form>
            id
            <input type="text" name="id" value={id} onChange={handleChange} />
            <br />
            パスワード
            <input type="password" name="pass" value={Pass} onChange={handleChange} />
            <br />
            <input type="button" value="ログイン" onClick={handleSubmit}/>
            </form>
            <br />
        </>
    );
}

export default Login;