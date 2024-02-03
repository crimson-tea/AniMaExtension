## AniMa Extension

[Anima](https://github.com/crimson-tea/AniMa) と連携するブラウザ拡張機能です。  
環境によっては正常に動かない場合があります。

### 導入方法

1. [Releases](https://github.com/crimson-tea/AniMaExtension/releases) から `AniMaExtension.zip` をダウンロードして解凍します。
2. ブラウザの拡張機能設定ページを開きデベロッパーモードを有効にします。
3. 「パッケージ化されていない拡張機能を読み込む」を選択し、1. で解凍した中の `manifest.json` が存在するディレクトリを選択します。

### 機能

1.  特定のタイミングで視聴完了を AniMa (WinForms) へ送信する
    Anima アプリの該当アイテムを自動的に視聴済みにすることができます

        以下のタイミングで自動的に視聴済みの操作を行います
        * 動画再生完了
        * おすすめアニメ表示
        * 次のアニメ表示

2.  おすすめアニメ表示、次のアニメ表示を自動的にキャンセルします

    エンディングまで視聴する方におすすめです  
    拡張機能のアイコンをクリックすると以下のオプションが出て設定を行えます
<img width="400" alt="image" src="https://github.com/crimson-tea/AniMaExtension/assets/91731135/53c6f775-6e0a-4e1f-b791-cfedcd4a270e">

