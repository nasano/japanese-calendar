和暦カレンダー
==============

非常にシンプルな和暦カレンダーです。  
最新の祝日法改正（山の日）に対応しています。

使用方法
--------

起動すると、今月のカレンダーが表示されます。  
年は、西暦と和暦で表示されます。明治以降の元号に対応しています。  
また、カレンダーの下には休日・二十四節気・年中行事の一覧が表示されます。  
日曜日と休日は、背景が赤く表示されます。  
今日の日付と一覧の項目は、背景が黄色く表示されます。

  * 矢印ボタン：左で前月、右で翌月のカレンダーを表示します。
  * 「今日」ボタン：今月のカレンダーを表示します。
  * 「年月選択」ボタン：表示する年月を選択します。

また、カレンダー部分をスワイプすることで表示する月を切り替えられます。

  * 左へスワイプ：翌月
  * 右へスワイプ：前月
  * 上へスワイプ：翌年
  * 下へスワイプ：前年

対応している各一覧
------------------

### 休日

  * 「国民の祝日に関する法律（祝日法）」にて定められた休日
  * 皇室慶弔行事に伴う休日

### 二十四節気

  * 春分
  * 清明
  * 穀雨
  * 立夏
  * 小満
  * 芒種
  * 夏至
  * 小暑
  * 大暑
  * 立秋
  * 処暑
  * 白露
  * 秋分
  * 寒露
  * 霜降
  * 立冬
  * 小雪
  * 大雪
  * 冬至
  * 小寒
  * 大寒
  * 立春
  * 雨水
  * 啓蟄

### 年中行事

  * 七草
  * 鏡開き
  * 節分
  * バレンタインデー
  * 雛祭り（桃の節句）
  * ホワイトデー
  * 彼岸の入り（春、秋）
  * 彼岸明け（春、秋）
  * エイプリルフール
  * メーデー
  * 八十八夜
  * 母の日
  * 入梅
  * 父の日
  * 半夏生
  * 七夕
  * 土用の丑の日
  * お盆（旧盆）
  * 二百十日
  * ハロウィン
  * 七五三
  * クリスマス・イブ
  * クリスマス
  * 大晦日

更新履歴
--------

### 1.3（2015/7/4リリース）

  * 雑節を表示する機能を追加。  
    （参考：[国立天文台暦計算室 こよみ用語解説 二十四節気](http://eco.mtk.nao.ac.jp/koyomi/faq/24sekki.html)、  
    [ユリウス通日 - Wikipedia](https://ja.wikipedia.org/wiki/%E3%83%A6%E3%83%AA%E3%82%A6%E3%82%B9%E9%80%9A%E6%97%A5#.E5.8D.81.E4.BA.8C.E6.94.AF.E3.81.AE.E6.B1.82.E3.82.81.E6.96.B9)、
    [土用の丑の日 - Wikipedia](https://ja.wikipedia.org/wiki/%E5%9C%9F%E7%94%A8%E3%81%AE%E4%B8%91%E3%81%AE%E6%97%A5)）
  * Aboutダイアログに各種リンクを追加。
  * Aboutダイアログを表示する際、カレンダーのスクロール位置を記憶・復元するようにした。  
    （参考：[.scrollTop() | jQuery API Documentation](https://api.jquery.com/scrollTop/)）
  * Aboutダイアログのスクロール位置をトップに移動するようにした。
  * Strictモードを使用するようにした。  
    （参考：[Strict モード - JavaScript | MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Strict_mode)、  
    [“use strict”（厳格モード）を使うべきか？｜もっこりJavaScript｜ANALOGIC（アナロジック）](http://analogic.jp/use-strict/)）
  * 厳密等価演算子を使用するようにした。
  * Dateオブジェクトは基本的に0時0分0秒で扱うようにした。
  * `Date.getTime()`を使用しないようにした。
  * スワイプ判定条件を修正。
  * 年中行事の判定ロジックを修正。
  * 日時入力欄の非表示方法を変更。  
    （参考：[overflowの解釈、間違ってませんか? - WebStudio](http://www.d-toybox.com/studio/weblog/show.php?mode=single&id=2005092101)）
  * 二十四節気のクラス名・関数名・変数名を変更。
  * コードを最適化。
  * CSSを最適化。

### 1.2（2015/6/6リリース）

  * スワイプによるカレンダー切り替え機能を追加。  
    （参考：[iPhone/Android/PC 対応。jQuery で書くタッチイベント (フェンリル | デベロッパーズブログ)](http://blog.fenrir-inc.com/jp/2011/06/ios_android_pc_touchevent.html)、  
    [タッチイベントで座標が上手く取れない問題のメモ | Another Sky](http://www.anothersky.pw/skyward/archives/000136.html)、  
    [jquery - Syntax for using selector in .on() method event-map? - Stack Overflow](http://stackoverflow.com/questions/9330590/syntax-for-using-selector-in-on-method-event-map)）

### 1.1（2015/5/23リリース）

  * 二十四節気と年中行事の一覧を表示する機能を追加。  
    （参考：[旧暦計算 JavaScript(ECMAScript) Library "qreki.js"](http://park1.wakwak.com/~y-nagano/Programs/koyomi/)）
  * 今日が休日の場合に背景色が黄色になっていなかったのを修正。
  * 年月選択ボタンで選択した場合、休日が正しく表示されない場合があるのを修正。  
    （参考：[意外と知られていないJavaScriptのnew Date()の使用方法 | iwb.jp](http://iwb.jp/javascript-new-date-gettime/)）
  * 西暦から和暦への変換を月単位で行うようにした。
  * 表示レイアウトを修正。

### 1.0（2015/5/15リリース）

  * 初リリース。  
    （参考：[script 要素 - HTML | MDN](https://developer.mozilla.org/ja/docs/Web/HTML/Element/Script)、
    [Apps.getSelf - Web API インターフェイス | MDN](https://developer.mozilla.org/ja/docs/Web/API/DOMApplicationsRegistry/getSelf)、  
    [Icon implementation for apps - App Center | MDN](https://developer.mozilla.org/en-US/Apps/Build/Icon_implementation_for_apps)、  
    [firefox - How to trigger native datepickers from javascript in FirefoxOS? - Stack Overflow](http://stackoverflow.com/questions/17492223/how-to-trigger-native-datepickers-from-javascript-in-firefoxos)）

ライセンス
----------

詳しくは LICENSE.md をご覧ください。

作成者
------

[ASANO, Naoyuki](http://multi.nadenade.com/leafy/)

  * ウェブサイト：<http://multi.nadenade.com/leafy/Mozilla/Calendar/>  
  * GitHub：<https://github.com/nasano/japanese-calendar>  
  * Firefox Marketplace：<https://marketplace.firefox.com/app/japanese-calendar>

Copyright (C) 2015 ASANO, Naoyuki All Rights Reserved.
