和暦カレンダー
==============

非常にシンプルな和暦カレンダーです。  
最新の祝日法改正（山の日）に対応しています。

使用方法
--------

最初に起動すると、今月のカレンダーが表示されます。  
年は、西暦と和暦で表示されます。明治以降の元号に対応しています。  
また、カレンダーの下には祝日・二十四節気・年中行事の一覧が表示されます。  
日曜日と祝日は、背景が赤く表示されます。  
今日の日付は、背景が黄色く表示されます。

  * 矢印ボタン：左で前月、右で次月のカレンダーを表示します。
  * 「今日」ボタン：今月のカレンダーを表示します。
  * 「年月選択」ボタン：表示する年月を選択します。

また、カレンダー部分をスワイプすることで表示する月を切り替えられます。

  * 左へスワイプ：次月
  * 右へスワイプ：前月
  * 上へスワイプ：次年
  * 下へスワイプ：前年

更新履歴
--------

### 1.2（2015/6/6リリース）

  * スワイプによるカレンダー切り替え機能を追加。  
    （参考：[iPhone/Android/PC 対応。jQuery で書くタッチイベント (フェンリル | デベロッパーズブログ)](http://blog.fenrir-inc.com/jp/2011/06/ios_android_pc_touchevent.html)、  
    [タッチイベントで座標が上手く取れない問題のメモ | Another Sky](http://www.anothersky.pw/skyward/archives/000136.html)、  
    [jquery - Syntax for using selector in .on() method event-map? - Stack Overflow](http://stackoverflow.com/questions/9330590/syntax-for-using-selector-in-on-method-event-map)）

### 1.1（2015/5/23リリース）

  * 二十四節気と年中行事の一覧を表示する機能を追加。  
    （参考：[旧暦計算 JavaScript(ECMAScript) Library "qreki.js"](http://park1.wakwak.com/~y-nagano/Programs/koyomi/)）
  * 今日が休日の場合に背景色が黄色になっていなかったのを修正。
  * 年月選択ボタンで選択した場合、祝日が正しく表示されない場合があるのを修正。  
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
