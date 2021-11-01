import React from 'react';


//ログアウト。cookieのリセット

function Logout(props){
    
    function funcLogout(e){
        props.cookie();
        props.func();
        props.message('');
        
    }
    
    //()はつけたら無限レンダリングになってしまう。
    //打ち込むたびに状態は変化している。じゃあ投稿を押したときは？
    return (
        <>
            <br />
            <button onClick={funcLogout}>
                ログアウト
            </button>
            <br />
            <br />
        </>
    );
}

export default Logout;