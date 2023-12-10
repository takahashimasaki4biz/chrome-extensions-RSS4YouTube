**RSS4YouTube** はChrome拡張機能です。YouTubeチャンネル更新をRSSリーダで取得したい場合に使用します。  
ワンクリックで、RSS用URLをクリップボードにコピーすることが出来ます。  
（YouTube自体でも登録チャンネルのウォッチは出来ますが、RSSリーダを使えば自分なりの仕分けができるなど便利です）  

### HOW TO INSTALL

- 本リポジトリをcloneするか、ZIPとしてダウンロード＆展開します。
- Chromeブラウザを開き、`chrome://extensions/` にアクセスします。
- 右上の「デベロッパーモード」を有効にします。
- 「パッケージ化されていない拡張機能を読み込む」をクリックし、展開したフォルダ（manifest.jsonなどを含むフォルダ）を選択します。
- インストールできたら「デベロッパーモード」は無効にしても良いです。
- Edgeブラウザでも流れは同様です。

### HOW TO USE

- YouTubeの任意のチャンネルを開き、拡張機能のアイコンをクリックします。
  - クリップボードのアクセスが許可されていない場合、失敗します。[chrome://settings/content/clipboard](chrome://settings/content/clipboard) から `www.youtube.com` が許可されているか（禁止されていないか）確認願います。
- クリップボードにコピーされた「YouTubeのRSS用URL」をお好みのRSSリーダに設定します。