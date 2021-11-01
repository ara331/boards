import React from 'react';
import {useState} from 'react';


//会員登録ボタンと、退会ボタン

function Button(props){
    const [ispush, setIsPush] = useState(false)
    function PublishRegister(){
        setIsPush(true)
    }
    if (props.page==='login'){
        if (ispush===false){
            return(
                <>
                    <button onClick={PublishRegister}>
                        退会はこちら
                    </button>
                    <br />
                    <br />
                </>
            );
        }else{
            props.func();
            return(
                <></>
            );
        }
    }else{
        if (ispush===false){
            return(
                <>
                    <button onClick={PublishRegister}>
                        会員登録はこちら
                    </button>
                    <br />
                    <br />
                </>
            );
        }else{
            props.func();
            return(
                <></>
            );
        }
    }
    
}

export default Button