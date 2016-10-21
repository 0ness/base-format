# ディレクトリ
``` html
.
├── gulpfile.js
├── package.json
├── htdocs                       // 出力先ディレクトリ
└── src                          // 開発用ディレクトリ
    ├── common
    │   └── js                   // JS
    │       └── common.js        // 共通 JS
    │ 
    ├── jade                     // Jade
    │   ├── includes             // インクルードファイル
    │   ├── templates            // テンプレートファイル
    │   └── *.jade               // 各 Jade ファイル
    │ 
    └── sass                     // Sass
        ├── common.scss          // 共通スタイル（生成ファイル）
        ├── _foundation.scss     // 'foundation' のインポート
        ├── _layout.scss         // 基本レイアウト
        ├── _modules.scss        // 'modules' のインポート
        ├── foundation
        │   ├── _reset.scss      // CSS リセット
        │   ├── _base.scss       // 基本設定
        │   ├── _functions.scss  // 関数
        │   ├── _mixins.scss     // Mixin
        │   └── _variables.scss  // 変数
        ├── libs                 // 外部ライブラリ
        ├── modules              // モジュール
        └── pages                // ページ固有のスタイル
```

# gulp
## 1. npm install
以下のコマンドで Node モジュールをインストールします。

```
$ npm install
```

## 2. gulp watch
npm のインストール後に以下のコマンドを実行することで、  
gulp のタスクが実行され、ファイルの変更を監視します。

```
$ gulp watch
```

# コーディング仕様
https://bitbucket.org/bondesignjp/koushi/issues/2/

# Git 運用ルール
https://bitbucket.org/bondesignjp/koushi/wiki/Git%20Guidelines

# 「プロジェクト紹介」グラフの実装方法
https://bitbucket.org/bondesignjp/koushi/wiki/Graph%20Setting