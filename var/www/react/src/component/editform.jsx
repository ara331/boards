import React, {useState} from 'react';
import axios from 'axios';

//コメントの編集機能。

function EditForm(props){

    const [id, setId] = useState('');
    const [comment, setComment] = useState('');
    const [sub, setSub] = useState('');
    const [checkdel,setCheckdel] = useState(false);
    const [checkadd, setCheckadd] =useState(false);
    const [img,setImg] = useState('');


    function handleChange(e){
        if(e.target.name === 'id') {
            setId(e.target.value);
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

    function delChange(){
        setCheckdel(!checkdel);
        if (checkadd==true){
            setCheckadd(!checkadd);
        }
    }
    function checkChange(){
        setCheckadd(!checkadd);
    }


    function handleSubmit(e){
        //コメントの編集リクエスト
        setSub('送信中');
        const data=[id,comment.toString(),props.name,checkdel,img];
        setImg('');
        if (checkdel===true || checkadd===false){
            data[4]='';
        }
        axios.post('http://localhost:8000/comment/edit',data)
        .then(response => {
            setSub(response.data);
            props.func();
        })                             //成功した場合
        .catch(() => {
            setSub('送信失敗');
        });
    }
    

    return (
        <>
            <form>
            編集したいコメントのid
            <input type="text" name="id" value={id} onChange={handleChange} />
            <br />
            {(() => {
                if (checkdel===false){
                    return (
                        <>
                            画像・動画を追加する（上書き）
                            <input type="checkbox" value={checkadd} onChange={checkChange} />
                            <br />
                        </>
                    );
                }
            })()}
            {(() => {
                if (checkdel===false && checkadd===true){
                    return (
                        <>
                            <input type="file" name="image" accept="video/*,image/*" onChange={imgChange} />
                            <br />
                            <img src={img} alt='ファイルが選択されていません' width='75' height='75' />
                            <br />
                        </>
                    );
                }
            })()}
            画像・動画を削除する
            <input type="checkbox" name="deletefile" value={checkdel} onChange={delChange} />
            <br />
            新しいコメント
            <input type="text" name="comment" value={comment} onChange={handleChange} />
            <br />
            <input type="button" value="編集" onClick={handleSubmit}/>
            </form>
            <br />
            送信状態：{sub}
            <br />
        </>
    );
}

export default EditForm;