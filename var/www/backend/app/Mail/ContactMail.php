<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ContactMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    // 引数で受け取ったデータ用の変数
    protected $contact;

    public function __construct($contact)
    {
      // 引数で受け取ったデータを変数にセット
      $this->name = $contact['name'];
      $this->url = $contact['url'];
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
          ->from('rain_ecc96@yahoo.co.jp') // 送信元
          ->subject('本登録は完了していません') // メールタイトル
          ->view('mail.body') // どのテンプレートを呼び出すか
          ->with(['name' => $this->name, 'url' => $this->url]); // withオプションでセットしたデータをテンプレートへ受け渡す
    }
}