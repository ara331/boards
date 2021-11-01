import './App.css';
import React,{useState,useEffect} from 'react';
import {Button,CommentView,Register,Login,Logout,User,Unsubscribe} from './index';
import axios from 'axios';
import { useCookies } from "react-cookie";
import Logo from './logo192.png';

//pageの遷移と会員登録のtokenの処理を担当。

function App() {

  const [Page, setPage]=useState('logout');
  const [id, setId]=useState('');
  const [Name,setName]=useState('');
  const [cookies, setCookie, removeCookie] = useCookies();
  const [message, setMessage] = useState('');
  const [head, setHead] = useState('');
  const [token, setToken] = useState('token');

  useEffect(() => {
    setHead(window.location.search.substr(1,9));
    setToken(window.location.search.substr(10));
    checktoken();
    if (token!=='token'){
      checklogin();
    }
  }, [token])


  //login関数
  function funclogin(){
    setPage('login');
  }
  //logout関数
  function funclogout(){
    setPage('logout');
  }
  function completeregister(){
    setPage('others.complete register');
  }

  function getid(id){
    setId(id);
  }
  function getName(name){
    setName(name);
  }

  //cookieの登録
  function scookie(id,pass){
    setCookie('id',id);
    setCookie('pass',pass);
  }
  //cookieの削除
  function rcookie(){
    removeCookie('id');
    removeCookie('pass');
  }
  
  //会員登録のページへ
  function setregister(){
    setPage('others.register');
  }

  //退会手続きのページへ
  function setunsubscribe(){
    setPage('others.unsubscribe');
  }
  function getm(message){
    setMessage(message);
  }
  
  function checklogin(){
    //cookieが残ってるかのチェック。これをjwtにしてもいいとは思う。せっかく作ったし。
    if (cookies['id'] && token===''){
      setMessage('cookieを用いたログイン中');
      const data=[cookies['id'],cookies['pass']];
      axios.post('http://localhost:8000/users/login', data)
      .then(response => {
        console.log(response.data);
        if (response.data[0]===1){
          funclogin();
          console.log('login成功');
          getid(response.data[1]);
          getName(response.data[2]);
        }else{
          setMessage('login失敗');
        }
      })                             //成功した場合
      .catch(() => {
        setMessage('login失敗');
      }); 
    }
  }
  function checktoken(){
    if (token!=='' && head==='urltoken='){
      setMessage('tokenの確認中');
      const data = [token.toString()];
      axios.post('http://localhost:8000/users/token', data)
      .then(response => {
        if (response.data[0]===1){
          setId(response.data[1]);
          setName(response.data[2]);
          scookie(response.data[1], response.data[3]);
          completeregister();
        }else{
          setMessage('不正なトークンです。');
        }
      })                             //成功した場合
      .catch(() => {
        console.log('通信失敗');
      });
    }
  }
  
  if (Page==='login'){
    //login時の処理
    return (
      <>
        <User Name={Name} id={id} />
        <CommentView Name={Name} id={id}/>
        <Logout func={funclogout} cookie={rcookie} message={getm}/>
        <Button page={Page} func={setunsubscribe}/>
      </>
    );


  }else if(Page==='logout'){
    //logout時の処理
    
    return(
      <>
        <img src={Logo} />
        <Login id={getid} name={getName} func={funclogin} cookie={scookie} message={getm} />
        送信状態：{message}<br /><br />
        <Button page={Page} func={setregister}/>
      </>
    );


  }else if(Page.substr(0,6)==='others'){

    if(Page.substr(7)==='register'){
      //会員登録時の処理
      return(
        <Register login={funclogin} logout={funclogout} getid={getid} getName={getName}/>
      );
  
  
    }else if(Page.substr(7)==='unsubscribe'){
      //退会時の処理
      return(
        <Unsubscribe login={funclogin} logout={funclogout} id={id}/>
      );
  
  
    }else if(Page.substr(7)==='complete register'){
      return(
        <>
          本登録が完了しました。<br />
          id : {id} <br />
          名前 : {Name}<br />
          {/*nginx無し */}
          {/*<a href="http://localhost:3000/">掲示板に進む</a>*/}
          {/*nginxあり */}
          <a href="http://localhost:8080/">掲示板に進む</a>
        </>
      );
    }
  }
  
}

export default App
