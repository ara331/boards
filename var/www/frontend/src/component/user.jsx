import React from 'react';

//メインのページの一番上

function User(props){
    
    return(
        <>
            <h4>ようこそ{props.Name}さん。</h4>
            あなたのidは{props.id}です。
            <br /><br />
        </>
    );
}

export default User;