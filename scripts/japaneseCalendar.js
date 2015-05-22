;(function($) {
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

    $(target).append('<div class="row"></div>');
    for (var i = 0; i < 7; i++) {
      $(".row").append('<div class="weekName day' + i + '">' +
                       settings.weekName[i] + "</div>");
    }

    //
    // 日付を表示
    //

    var today = new Date();
    var todayString = today.getFullYear() + "/" + (today.getMonth() + 1) +
                      "/" + today.getDate();
    var dayOfWeekCount = 0;
    var rowWeek = $('<div class="row"></div>');

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
        if (dayOfWeekCount == 0 || holidayName != "") {
          className += " holiday";
        }
        // 今日の場合
        if (dayString == todayString) {
          className += " today";
        }

        $(rowWeek).append('<div class="day day' + dayOfWeekCount + className +
                          '">' + i + "</div>");
      }

      // 週末で改行
      if (dayOfWeekCount++ > 5) {
        $(target).append($(rowWeek));
        rowWeek = $('<div class="row"></div>');
        dayOfWeekCount = 0;
      }
    }

    //
    // 祝日一覧を表示
    //

    var holidays = '<p class="holidayName">';

    for (var i = 1, lastDay = lastDate.getDate(); i < lastDay; i++) {
      var day = new Date(new Date(settings.day.getTime()).setDate(i));
      var holidayName = ktHolidayName(day);

      if (holidayName != "") {
        holidays += i + "(" + settings.weekName[day.getDay()] + ") " +
                    holidayName + "<br>";
      }
    }

    holidays += "</p>";
    $(target).append(holidays);

    //
    // 西暦を和暦に変換
    // 参考：http://www.openreference.org/articles/view/189
    //

    function toJapaneseEra(year, month) {
      var jaYear = "";

      if (year >= 1990) {
        jaYear = "(平成" + (year - 1988) + "年)";
      } else if (year == 1989) {
        if (month >= 1) {
          jaYear = "(平成元年)";
        } else {
          jaYear = "(昭和" + (year - 1925) + "年)";
        }
      } else if (year >= 1927) {
        jaYear = "(昭和" + (year - 1925) + "年)";
      } else if (year == 1926) {
        if (month >= 12) {
          jaYear = "(昭和元年)";
        } else {
          jaYear = "(大正" + (year - 1911) + "年)";
        }
      } else if (year >= 1913) {
        jaYear = "(大正" + (year - 1911) + "年)";
      } else if (year == 1912) {
        if (month >= 7) {
          jaYear = "(大正元年)";
        } else {
          jaYear = "(明治" + (year - 1867) + "年)";
        }
      } else if (year >= 1869) {
        jaYear = "(明治" + (year - 1867) + "年)";
      } else if (year == 1868) {
        if (month >= 1) {
          jaYear = "(明治元年)";
        } else {
          jaYear = "";
        }
      }

      return jaYear;
    }
  };
})(jQuery);

$(document).ready(function() {
  var monthOffset = 0;
  var settings = {};

  // カレンダーを表示
  $("#calendar").japaneseCalendar(settings);

  // 前月のカレンダーを表示
  $("#prev").click(function() {
    monthOffset--;
    settings.day = getOffsetDate();
    $("#calendar").japaneseCalendar(settings);
  });

  // 次月のカレンダーを表示
  $("#next").click(function() {
    monthOffset++;
    settings.day = getOffsetDate();
    $("#calendar").japaneseCalendar(settings);
  });

  // 今月のカレンダーを表示
  $("#today").click(function() {
    monthOffset = 0;
    settings.day = getOffsetDate();
    $("#calendar").japaneseCalendar(settings);
  });

  // 表示するカレンダーの年月の選択を開始
  $("#selectYearMonth").click(function() {
    var viewDate = getOffsetDate();

    // 今表示されているカレンダーの日付を初期値としてセット
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

  // 選択された年月のカレンダーを表示
  $("#datePicker").blur(function() {
    // blur イベントが発生するのは「OK」か「キャンセル」が押された為なので
    // 日付入力欄の値を取得
    var selectDate = new Date($("#datePicker").val());

    monthOffset = (selectDate.getFullYear() - new Date().getFullYear()) * 12;
    monthOffset += selectDate.getMonth() - new Date().getMonth();
    settings.day = selectDate;

    // カレンダーを表示
    $("#calendar").japaneseCalendar(settings);
  });

  // About ダイアログを表示
  $("#about").click(function() {
    var request = window.navigator.mozApps.getSelf();
    request.onsuccess = function() {
      if (request.result) {
        var manifest = request.result.manifest;
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
        $("#aboutDialog").fadeIn(200);
      }
    }
  });

  // About ダイアログを消去
  $("#close").click(function() {
    $("#aboutDialog").fadeOut(200);
  });

  // 差分を計算した Date オブジェクトを取得
  function getOffsetDate() {
    return new Date(new Date().getFullYear(),
                    new Date().getMonth() + monthOffset, new Date().getDate());
  }
});
