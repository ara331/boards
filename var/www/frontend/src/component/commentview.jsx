import React, {useState,useEffect} from 'react';
import axios from 'axios';
import {TestForm,DeleteForm,EditForm} from '../index'

//コメント一覧機能

function CommentView(props){
    const [Data, setData] = useState('');
    const [senddata, setSenddata]=useState('取得中');

    function show(){
        axios.post('http://localhost:8000/comment/show')
        .then(response => {
            setData(response.data);
            setSenddata('');
            console.log('コメント取得成功');
        },[])                             //成功した場合、postsを更新する（then）
        .catch(() => {
            console.log('通信に失敗しました');
        });                             //失敗した場合(catch)
    }
    useEffect(() => {
        show();
        },[])
    
    return(
        <>
            コメント一覧:{senddata}
            <br />
            {(() => {
                const items = [];
                for (let i = 0; i < Data.length; i++) {
                    if (Data[i][5]===1 && Data[i][4]===0){
                        if (Data[i][3]!==""){
                            items.push(<tr><td>{Data[i][0]}</td><td>{Data[i][1]}</td><td>{Data[i][2]}</td><td><img src={Data[i][3]} alt='アップロード画像' width='75' height='75'/></td><td> (編集済み)</td></tr>);
                        }else{
                            items.push(<tr><td>{Data[i][0]}</td><td>{Data[i][1]}</td><td>{Data[i][2]}</td><td></td><td> (編集済み)</td></tr>);
                        }
                        
                    }else{
                        if (Data[i][3]!==""){
                            items.push(<tr><td>{Data[i][0]}</td><td>{Data[i][1]}</td><td>{Data[i][2]}</td><td><img src={Data[i][3]} alt='アップロード画像' width='75' height='75'/></td><td></td></tr>);
                        }else{
                            items.push(<tr><td>{Data[i][0]}</td><td>{Data[i][1]}</td><td>{Data[i][2]}</td><td></td><td></td></tr>);
                        }
                        
                    }
                }
                return (
                    <table border='1'>
                        <tr>
                            <th>id</th>
                            <th>名前</th>
                            <th>コメント</th>
                            <th>動画像</th>
                            <th></th>
                        </tr>
                        {items}
                    </table>
                );
            })()}
            <button onClick={show}>更新</button><br /><br />
            ------------------------------------------------------<br />
            <TestForm func={show} name={props.Name}/>
            ------------------------------------------------------
            <DeleteForm func={show} name={props.Name} id={props.id}/>
            ------------------------------------------------------
            <EditForm func={show} name={props.Name} id={props.id}/>
            ------------------------------------------------------
        </>
    );
}

export default CommentView;