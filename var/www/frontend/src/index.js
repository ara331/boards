import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//cookieの利用に必要
import { CookiesProvider } from "react-cookie";


export {default as CommentView} from './component/commentview';
export {default as TestForm} from './component/form';
export {default as DeleteForm} from './component/deleteform';
export {default as EditForm} from './component/editform';
export {default as Login} from './component/login';
export {default as Logout} from './component/logout';
export {default as Button} from './component/button';
export {default as Register} from './component/register';
export {default as User} from './component/user';
export {default as Unsubscribe} from './component/unsubscribe';



//いわゆるエントリポイントと呼ばれるファイル
//他のところで作ったコンポーネントを一つのファイルでまとめる
//→そうすると、このファイルをインポートするだけで、いろんなコンポーネントが利用できる。


//メインの描画
ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
