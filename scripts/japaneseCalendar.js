;(function($) {
  //
  // Strict モード
  //

  "use strict";

  //
  // プラグイン化
  //

  $.fn.japaneseCalendar = function(options) {
    $.japaneseCalendar(this, options);
    return this;
  }

  $.japaneseCalendar = function(target, options) {
    var settings = $.extend({
      "day": new Date(),
      "weekName": ["日", "月", "火", "水", "木", "金", "土"]
    }, options);

    var startDay = 1 - new Date(settings.day.getFullYear(),
                                settings.day.getMonth(), 1).getDay();
    var lastDate = new Date(settings.day.getFullYear(),
                            settings.day.getMonth() + 1, 0);
    var endDay = 7 - lastDate.getDay();

    //
    // 現在表示されているカレンダーを消去
    //

    $(target).empty();

    //
    // 年月を表示
    //

    $(target).append('<div class="yearMonth">' + settings.day.getFullYear() +
                     "年" + toJapaneseEra(settings.day.getFullYear(),
                                          settings.day.getMonth() + 1) +
                     (settings.day.getMonth() + 1) + "月</div>");

    //
    // 曜日を表示
    //

    var calendarBody = $('<div id="calendarBody"></div>');
    var rowWeek = $('<div class="row"></div>');

    for (var i = 0; i < 7; i++) {
      $(rowWeek).append('<div class="weekName day' + i + '">' +
                        settings.weekName[i] + "</div>");
    }
    $(calendarBody).append($(rowWeek));

    //
    // 日付を表示
    //

    var today = new Date();
    var todayString = today.getFullYear() + "/" + (today.getMonth() + 1) +
                      "/" + today.getDate();
    var dayOfWeekCount = 0;

    rowWeek = $('<div class="row"></div>');

    for (var i = startDay, lastDay = lastDate.getDate(); i < lastDay + endDay;
         i++) {
      // 表示する月内でなければ空欄
      if (i < 1 || i > lastDay) {
        $(rowWeek).append('<div class="day day' + dayOfWeekCount +
                          '">&nbsp;</div>');
      } else {
        var day = new Date(new Date(settings.day.getTime()).setDate(i));
        var dayString = day.getFullYear() + "/" + (day.getMonth() + 1) + "/" +
                        day.getDate();
        var holidayName = ktHolidayName(day);
        var className = "";

        // 日曜か祝日の場合
        if (dayOfWeekCount === 0 || holidayName !== "") {
          className += " holiday";
        }
        // 今日の場合
        if (dayString === todayString) {
          className += " today";
        }

        $(rowWeek).append('<div class="day day' + dayOfWeekCount + className +
                          '">' + i + "</div>");
      }

      // 週末で改行
      if (dayOfWeekCount++ > 5) {
        $(calendarBody).append($(rowWeek));
        rowWeek = $('<div class="row"></div>');
        dayOfWeekCount = 0;
      }
    }

    $(target).append($(calendarBody));

    //
    // 祝日一覧を表示
    //

    var dayList = $('<div class="dayList"></div>');
    var holidays = "";

    for (var i = 1, lastDay = lastDate.getDate(); i <= lastDay; i++) {
      var day = new Date(new Date(settings.day.getTime()).setDate(i));
      var holidayName = ktHolidayName(day);

      if (holidayName !== "") {
        holidays += i + "(" + settings.weekName[day.getDay()] + ") " +
                    holidayName + "<br>";
      }
    }

    if (holidays !== "") {
      holidays = '<div class="holidayHead">祝日</div>' +
                 '<div class="holidayBody">' + holidays + "</div>";
      $(dayList).append(holidays);
    }

    //
    // 二十四節気一覧を表示
    //

    var nijushiSekkiDays = "";

    for (var i = 1, lastDay = lastDate.getDate(); i <= lastDay; i++) {
      var day = new Date(new Date(settings.day.getTime()).setDate(i));
      var nijushiSekkiName = checkNijushiSekki(day);

      if (nijushiSekkiName !== "") {
        nijushiSekkiDays += i + "(" + settings.weekName[day.getDay()] + ") " +
                            nijushiSekkiName + "<br>";
      }
    }

    if (nijushiSekkiDays !== "") {
      nijushiSekkiDays = '<div class="nijushiSekkiHead">二十四節気</div>' +
                         '<div class="nijushiSekkiBody">' + nijushiSekkiDays +
                         "</div>";
      $(dayList).append(nijushiSekkiDays);
    }

    //
    // 年中行事一覧を表示
    //

    var annualFunctions = "";

    for (var i = 1, lastDay = lastDate.getDate(); i <= lastDay; i++) {
      var day = new Date(new Date(settings.day.getTime()).setDate(i));
      var annualFunctionName = checkAnnualFunction(day);

      if (annualFunctionName !== "") {
        annualFunctions += i + "(" + settings.weekName[day.getDay()] + ") " +
                           annualFunctionName + "<br>";
      }
    }

    if (annualFunctions !== "") {
      annualFunctions = '<div class="annualFunctionHead">年中行事</div>' +
                        '<div class="annualFunctionBody">' + annualFunctions +
                        "</div>";
      $(dayList).append(annualFunctions);
    }

    $(target).append(dayList);

    //
    // 西暦を和暦に変換
    // 参考：http://www.openreference.org/articles/view/189
    //

    function toJapaneseEra(year, month) {
      var jaYear = "";

      if (year >= 1990) {
        jaYear = "(平成" + (year - 1988) + "年)";
      } else if (year === 1989) {
        if (month >= 1) {
          jaYear = "(平成元年)";
        } else {
          jaYear = "(昭和" + (year - 1925) + "年)";
        }
      } else if (year >= 1927) {
        jaYear = "(昭和" + (year - 1925) + "年)";
      } else if (year === 1926) {
        if (month >= 12) {
          jaYear = "(昭和元年)";
        } else {
          jaYear = "(大正" + (year - 1911) + "年)";
        }
      } else if (year >= 1913) {
        jaYear = "(大正" + (year - 1911) + "年)";
      } else if (year === 1912) {
        if (month >= 7) {
          jaYear = "(大正元年)";
        } else {
          jaYear = "(明治" + (year - 1867) + "年)";
        }
      } else if (year >= 1869) {
        jaYear = "(明治" + (year - 1867) + "年)";
      } else if (year === 1868) {
        if (month >= 1) {
          jaYear = "(明治元年)";
        } else {
          jaYear = "";
        }
      }

      return jaYear;
    }

    //
    // 太陽黄経を計算
    //

    function longitudeSun(date) {
      var tm = date.getJD();
      var tm1 = Math.floor(tm);
      var tm2 = tm - tm1 + tz;
      var t = (tm2 + 0.5) / 36525.0 + (tm1 - 2451545.0) / 36525.0;

      return LONGITUDE_SUN(t);
    }

    //
    // 二十四節気の判定
    // 参考：http://eco.mtk.nao.ac.jp/koyomi/faq/24sekki.html
    //

    function checkNijushiSekki(day) {
      var nijushiSekkiList = ["春分", "清明", "穀雨", "立夏", "小満", "芒種",
                              "夏至", "小暑", "大暑", "立秋", "処暑", "白露",
                              "秋分", "寒露", "霜降", "立冬", "小雪", "大雪",
                              "冬至", "小寒", "大寒", "立春", "雨水", "啓蟄"];

      day.setHours(0, 0, 0);

      var nextDay = new Date(day.getFullYear(), day.getMonth(),
                             day.getDate() + 1, 0, 0, 0);
      var dayLongitude = Math.floor(longitudeSun(day) / 15.0);
      var nextDayLongitude = Math.floor(longitudeSun(nextDay) / 15.0);

      if (dayLongitude !== nextDayLongitude) {
        return nijushiSekkiList[nextDayLongitude];
      } else {
        return "";
      }
    }

    //
    // 年中行事の判定
    //

    function checkAnnualFunction(date) {
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var annualFunctionName = "";

      switch (month) {
        case 1:
          if (day === 7) {
            annualFunctionName = "七草";
          } else if (day === 11) {
            annualFunctionName = "鏡開き";
          }
          break;
        case 2:
          if (day === 14) {
            annualFunctionName = "バレンタインデー";
          } else {
            // 立春を求める
            var risshun = 0;
            var lastDate = new Date(year, month + 1, 0);

            for (var i = 1, lastDay = lastDate.getDate(); i < lastDay; i++) {
              var theDay = new Date(new Date(date.getTime()).setDate(i));

              if (checkNijushiSekki(theDay) === "立春") {
                risshun = i;
                break;
              }
            }

            if (day === risshun - 1) {
              annualFunctionName = "節分";
            }
          }
          break;
        case 3:
          if (day === 3) {
            annualFunctionName = "雛祭り(桃の節句)";
          } else if (day === 14) {
            annualFunctionName = "ホワイトデー";
          }
          break;
        case 4:
          if (day === 1) {
            annualFunctionName = "エイプリルフール";
          }
          break;
        case 5:
          if (day === 1) {
            annualFunctionName = "メーデー";
          } else {
            // 第2日曜
            if (date.getDay() === 0 && (Math.floor((day - 1) / 7) + 1) === 2) {
              annualFunctionName = "母の日";
            }
          }
          break;
        case 6:
          // 第3日曜
          if (date.getDay() === 0 && (Math.floor((day - 1) / 7) + 1) === 3) {
            annualFunctionName = "父の日";
          }
          break;
        case 7:
          if (day === 7) {
            annualFunctionName = "七夕";
          }
          break;
        case 8:
          if (day === 15) {
            annualFunctionName = "お盆(旧盆)";
          }
          break;
        case 9:
          break;
        case 10:
          if (day === 31) {
            annualFunctionName = "ハロウィン";
          }
          break;
        case 11:
          if (day === 15) {
            annualFunctionName = "七五三";
          }
          break;
        case 12:
          if (day === 24) {
            annualFunctionName = "クリスマス・イブ";
          } else if (day === 25) {
            annualFunctionName = "クリスマス";
          } else if (day === 31) {
            annualFunctionName = "大晦日";
          }
          break;
      }

      return annualFunctionName;
    }
  };
})(jQuery);

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
  // カレンダーを表示
  //

  $("#calendar").japaneseCalendar(settings);

  //
  // 前月のカレンダーを表示
  //

  $("#prev").click(function() {
    monthOffset--;
    showCalendar();
  });

  //
  // 次月のカレンダーを表示
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
    // 今表示されているカレンダーの日付を初期値としてセット
    var viewDate = getOffsetDate();
    var viewDateString = viewDate.getFullYear() + "-";

    if (viewDate.getMonth() < 9) {
      viewDateString += "0" + (viewDate.getMonth() + 1) + "-";
    } else {
      viewDateString += (viewDate.getMonth() + 1) + "-";
    }
    if (viewDate.getDate() < 10) {
      viewDateString += "0" + viewDate.getDate();
    } else {
      viewDateString += viewDate.getDate();
    }
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

    monthOffset = (selectDate.getFullYear() - new Date().getFullYear()) * 12;
    monthOffset += selectDate.getMonth() - new Date().getMonth();
    settings.day = selectDate;

    // カレンダーを表示
    $("#calendar").japaneseCalendar(settings);
  });

  //
  // About ダイアログを表示
  //

  $("#about").click(function() {
    // 現在のスクロール位置を記憶
    scrollTopPosition = $(window).scrollTop();

    var request = window.navigator.mozApps.getSelf();

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
          // 次月のカレンダーを表示
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
          // 次年のカレンダーを表示
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
  // 差分を計算した Date オブジェクトを取得
  //

  function getOffsetDate() {
    return new Date(new Date().getFullYear(),
                    new Date().getMonth() + monthOffset, new Date().getDate());
  }

  //
  // カレンダーを表示
  //

  function showCalendar() {
    settings.day = getOffsetDate();
    $("#calendar").japaneseCalendar(settings);
  }
});
