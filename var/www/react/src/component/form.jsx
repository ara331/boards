import React, {useState,useEffect} from 'react';
import axios from 'axios';

//コメントの投稿機能

function TestForm(props){

    const [id, setId] = useState('取得中');
    const [Name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [sub, setSub] = useState('');
    const [img, setImg] = useState('');
    const [check, setCheck] = useState(false);

    useEffect(() => {
        axios.post('http://localhost:8000/comment/rows')
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
        } else if (e.target.name === 'comment') {
            setComment(e.target.value);
        }
    }
    
    function imgChange(e){
        e.preventDefault();
        const reader =new FileReader();
        const file = e.target.files[0];
        //読み込みが終わったらイベントが実行される。
        reader.onloadend = () =>{
            setImg(reader.result);
        }
        console.log(file);
        console.log("imagePreviewUrl="+img);
        reader.readAsDataURL(file);
    }
    
    //ボタンを押すことで動画像を投稿するかどうかが決めれる。
    function checkChange(){
        setCheck(!check);
    }

    function handleSubmit(e){
        const data=[id,props.name,comment.toString(),img];
        setImg('');
        if (check===false){
            data[3]='';
        }
    
        setSub('送信中');
        console.log(id);
        axios.post('http://localhost:8000/comment/insert',data)
        .then(response => {
            if (response.data==='insert成功'){
                setSub('投稿完了');
                //コメント番号を変更
                setId(id+1);
                props.func();
            }else{
                setSub(response.data);
            }
            
        })                             //成功した場合
        .catch(() => {
            console.log('insert失敗');
            setSub('投稿失敗');
        });
    }
    

    return (
        <>
            コメントid ：{id}<br />
            <form method='post'>
            名前　　　：{props.name}
            <br />
            コメント
            <input type="text" name="comment" value={comment} onChange={handleChange} />
            <br />
            画像・動画のアップロード　　
            <input type="checkbox" value={check} onChange={checkChange} />
            {(() => {
                if (check===true){
                    return (
                        <>
                            <br />
                            <input type="file" name="image" accept="video/*,image/*" onChange={imgChange} />
                            <br />
                            <img src={img} alt='ファイルが選択されていません' width='75' height='75' />
                        </>
                    );
                }
            })()}
            <br />
            <br />
            <input type="button" value="投稿" onClick={handleSubmit}/>
            </form>
            <br />
            送信状態：{sub}
            <br />
        </>
    );
}

export default TestForm;