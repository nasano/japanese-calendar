$(document).ready(function() {
  //
  // Strict モード
  //

  "use strict";

  var monthOffset = 0;
  var settings = {};
  var startPageX = 0;
  var startPageY = 0;
  var movePageX = 0;
  var movePageY = 0;
  var scrollTopPosition = 0;
  var swipeDistanceThreshold = Math.min($(window).width(),
                                        $(window).height()) / 8;

  //
  // 今日のカレンダーを表示
  //

  showCalendar();

  //
  // 前月のカレンダーを表示
  //

  $("#prev").click(function() {
    monthOffset--;
    showCalendar();
  });

  //
  // 翌月のカレンダーを表示
  //

  $("#next").click(function() {
    monthOffset++;
    showCalendar();
  });

  //
  // 今月のカレンダーを表示
  //

  $("#today").click(function() {
    monthOffset = 0;
    showCalendar();
  });

  //
  // 表示するカレンダーの年月の選択を開始
  //

  $("#selectYearMonth").click(function() {
    var viewDate = getOffsetDate();
    var viewDateString = viewDate.getFullYear() + "-";

    viewDateString += ("0" + (viewDate.getMonth() + 1)).substr(-2) + "-";
    viewDateString += ("0" + viewDate.getDate()).substr(-2);

    // 今表示されているカレンダーの日付を初期値としてセット
    $("#datePicker").val(viewDateString);

    // 日付入力欄にフォーカスを移動
    $("#datePicker").focus();
  });

  //
  // 選択された年月のカレンダーを表示
  //

  $("#datePicker").blur(function() {
    // blur イベントが発生するのは「OK」か「キャンセル」が押された為なので
    // 日付入力欄の値を取得
    var selectDate = new Date($("#datePicker").val());

    // ハイフンで区切られた日付だと GMT+9 になるので修正
    selectDate.setHours(0, 0, 0);

    var today = new Date();

    monthOffset = (selectDate.getFullYear() - today.getFullYear()) * 12;
    monthOffset += selectDate.getMonth() - today.getMonth();

    // カレンダーを表示
    showCalendar();
  });

  //
  // About ダイアログを表示
  //

  $("#about").click(function() {
    var request = window.navigator.mozApps.getSelf();

    // 現在のスクロール位置を記憶
    scrollTopPosition = $(window).scrollTop();

    request.onsuccess = function() {
      if (request.result) {
        var manifest = request.result.manifest;
        var gitHubURL = "https://github.com/nasano/japanese-calendar";
        var marketplaceURL =
              "https://marketplace.firefox.com/app/japanese-calendar";

        $("#aboutDialogContent").empty();
        $("#aboutDialogContent").append('<p><img class="appIcon" src="' +
                                        manifest.icons[512] + '"></p>');
        $("#aboutDialogContent").append('<p class="appName">' +
                                        manifest.locales.ja.name + "</p>");
        $("#aboutDialogContent").append('<hr class="appHr">');
        $("#aboutDialogContent").append("<p>バージョン: " + manifest.version +
                                        "</p>");
        $("#aboutDialogContent").append("<p>作成者: " +
                                        manifest.developer.name + "</p>");
        $("#aboutDialogContent").append('<p><a target="_blank" href="' +
                                        manifest.developer.url +
                                        '">ウェブサイト</a> | ' +
                                        '<a target="_blank" href="' +
                                        gitHubURL + '">GitHub</a> | ' +
                                        '<a target="_blank" href="' +
                                        marketplaceURL +
                                        '">Firefox Marketplace</a></p>');

        $("#aboutDialog").fadeIn(200);

        // About ダイアログのスクロール位置をトップに移動
        $("#aboutDialog").scrollTop(0);
      }
    }
  });

  //
  // About ダイアログを消去
  //

  $("#close").click(function() {
    // スクロール位置を復元
    $(window).scrollTop(scrollTopPosition);

    $("#aboutDialog").fadeOut(200);
  });

  //
  // スワイプでカレンダーを切り替え
  //

  $("#calendar").on({
    "touchstart": function(e) {
      e.preventDefault();
      startPageX = e.originalEvent.changedTouches[0].pageX;
      startPageY = e.originalEvent.changedTouches[0].pageY;
      movePageX = startPageX;
      movePageY = startPageY;
    },

    "touchmove": function(e) {
      e.preventDefault();
      movePageX = e.originalEvent.changedTouches[0].pageX;
      movePageY = e.originalEvent.changedTouches[0].pageY;
    },

    "touchend": function(e) {
      if (Math.abs(startPageX - movePageX) >
          Math.abs(startPageY - movePageY)) {
        // 左右スワイプ
        if (startPageX - movePageX > swipeDistanceThreshold) {
          // 翌月のカレンダーを表示
          monthOffset++;
          showCalendar();
        } else if (movePageX - startPageX > swipeDistanceThreshold) {
          // 前月のカレンダーを表示
          monthOffset--;
          showCalendar();
        }
      } else {
        // 上下スワイプ
        if (startPageY - movePageY > swipeDistanceThreshold) {
          // 翌年のカレンダーを表示
          monthOffset += 12;
          showCalendar();
        } else if (movePageY - startPageY > swipeDistanceThreshold) {
          // 前年のカレンダーを表示
          monthOffset -= 12;
          showCalendar();
        }
      }
    }
  }, "#calendarBody");

  //
  // 月差分を計算した Date オブジェクトを取得
  //

  function getOffsetDate() {
    var today = new Date();

    return new Date(today.getFullYear(), today.getMonth() + monthOffset,
                    today.getDate());
  }

  //
  // 月差分を計算してカレンダーを表示
  //

  function showCalendar() {
    settings.date = getOffsetDate();
    $("#calendar").japaneseCalendar(settings);
  }
});
