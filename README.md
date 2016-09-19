和暦カレンダー
==============

非常にシンプルな和暦カレンダーです。  
最新の祝日法改正（山の日）に対応しています。

使用方法
--------

起動すると、今月のカレンダーが表示されます。  
年は、西暦と和暦（元号）と干支（十二支）が表示されます。元号は明治以降に対応しています。  
月は、旧暦の月名も表示されます。  
また、カレンダーの下には休日・二十四節気・年中行事の一覧が表示されます。  
日曜日と休日は、文字と背景が赤く表示されます。  
日付と各一覧の中で今日のものは、背景が黄色く表示されます。

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

  * 七草の節句（人日）
  * 鏡開き
  * 節分
  * バレンタインデー
  * 雛祭り（桃の節句・上巳）
  * ホワイトデー
  * 彼岸の入り（春・秋）
  * 彼岸明け（春・秋）
  * エイプリルフール
  * メーデー
  * 菖蒲の節句（端午）
  * 八十八夜
  * 母の日
  * 入梅
  * 父の日
  * 半夏生
  * 七夕
  * 土用の丑の日
  * お盆（旧盆）
  * 菊の節句（重陽）
  * 中秋の名月（十五夜）
  * 二百十日
  * ハロウィン
  * 七五三
  * クリスマス・イブ
  * クリスマス
  * 大晦日

更新履歴
--------

### 1.5（2015/12/27リリース）

  * 年の干支と旧暦の月名を表示する機能を追加。
  * 休日の文字を赤にし背景色を薄くした。
  * 日付の影のスタイルを修正。
  * 日時入力欄の非表示方法を修正。

### 1.4.1（2015/8/30リリース）

  * 月末にカレンダーが正常に表示されない場合があるのを修正。
  * 彼岸の入り・彼岸明けの表示を追加。
  * 前月と翌月の日付も表示するようにした。
  * 各一覧で今日のものは背景を黄色く表示するようにした。
  * HolidayChk.jsが配布元サイトで更新されたので追随（1970年より前の休日も表示できるようになった）。
  * 「祝日」を「休日」に変更。
  * 「次月」を「翌月」に変更。
  * 各一覧の日付を右寄せにした。  
    （参考：<a href="http://www.tam-tam.co.jp/tipsnote/html_css/post4559.html">【スマホサイト】display:table-cellにmarginを指定したい | Tips Note</a>）
  * 各一覧と日付の影のスタイルを変更。
  * 各一覧のレイアウトを微調整。
  * Aboutダイアログのフェード時間を調整。
  * Aboutダイアログのロゴサイズ指定を`px`から`em`に変更。
  * 曜日名の表示スタイルを微修正。
  * 各一覧表示のループを1つにまとめた。
  * jQueryプラグイン部分を別ファイルに分離。  
    （参考：<a href="http://dev.classmethod.jp/slide/html5-css3-jquery-jqplugin/">jQueryプラグインの作り方について詳しく ｜ Developers.IO</a>）
  * Dateオブジェクトの変数名は`date`、日にちの変数名は`day`となるよう変更。
  * CSSのフォントサイズ指定を`pt`から`%`に変更。
  * コードを単純化・最適化。

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
