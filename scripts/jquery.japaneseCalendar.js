;(function($) {
  //
  // Strict モード
  //

  "use strict";

  //
  // プラグイン化
  //

  $.fn.japaneseCalendar = function(options) {
    var target = this;
    var settings = $.extend({
      "date": new Date(),
      "weekName": ["日", "月", "火", "水", "木", "金", "土"]
    }, options);

    // 0時0分0秒にしておく
    settings.date.setHours(0, 0, 0);

    var year = settings.date.getFullYear();
    var month = settings.date.getMonth();
    var lastDate = new Date(year, month + 1, 0);

    //
    // 現在表示されているカレンダーを消去
    //

    $(target).empty();

    //
    // 年月を表示
    //

    $(target).append('<div class="yearMonth">' + year + "年" +
                     toJapaneseEra(year, month + 1) + (month + 1) +
                     "月</div>");

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
    var todayYear = today.getFullYear();
    var todayMonth = today.getMonth();
    var todayDay = today.getDate();

    var startDayOfWeek = 1 - new Date(year, month, 1).getDay();
    var endDayOfWeek = 7 - lastDate.getDay();
    var lastDay = lastDate.getDate();
    var dayOfWeekCount = 0;

    rowWeek = $('<div class="row"></div>');

    for (var i = startDayOfWeek; i < lastDay + endDayOfWeek; i++) {
      var iDate = new Date(year, month, i);
      var iYear = iDate.getFullYear();
      var iMonth = iDate.getMonth();
      var iDay = iDate.getDate();

      var className = "";

      // 今日の場合
      if (todayYear === iYear && todayMonth === iMonth && todayDay === iDay) {
        className += " today";
      }

      if (i < 1 || i > lastDay) {
        // 表示している月以外の場合
        className += " otherDay";
      } else if (dayOfWeekCount === 0 || ktHolidayName(iDate) !== "") {
        // 日曜か休日の場合
        className += " holiday";
      }

      $(rowWeek).append('<div class="day day' + dayOfWeekCount + className +
                        '">' + iDay + "</div>");

      // 週末で改行
      if (dayOfWeekCount++ > 5) {
        $(calendarBody).append($(rowWeek));
        rowWeek = $('<div class="row"></div>');
        dayOfWeekCount = 0;
      }
    }

    $(target).append($(calendarBody));

    //
    // 休日・二十四節気・年中行事の一覧を表示
    //

    var holidays = "";
    var nijushiSekkiDays = "";
    var annualFunctions = "";

    for (var i = 1; i <= lastDay; i++) {
      var date = new Date(year, month, i);
      var dayOfWeek = date.getDay();
      var className = "";

      var holidayName = ktHolidayName(date);
      var nijushiSekkiName = checkNijushiSekki(date);
      var annualFunctionName = checkAnnualFunction(date);

      // 今日の場合
      if (todayYear === year && todayMonth === month && todayDay === i) {
        className += " today";
      }

      // 休日の場合
      if (holidayName !== "") {
        holidays += '<div class="holidayRow' + className + '">' +
                    '<span class="holidayDay">' + i +
                    "(" + settings.weekName[dayOfWeek] + ")</span>" +
                    '<span class="holidayName">' +
                    holidayName + "</span></div>";
      }

      // 二十四節気の場合
      if (nijushiSekkiName !== "") {
        nijushiSekkiDays += '<div class="nijushiSekkiRow' + className + '">' +
                            '<span class="nijushiSekkiDay">' + i +
                            "(" + settings.weekName[dayOfWeek] + ")</span>" +
                            '<span class="nijushiSekkiName">' +
                            nijushiSekkiName + "</span></div>";
      }

      // 年中行事の場合
      if (annualFunctionName !== "") {
        annualFunctions += '<div class="annualFunctionRow' + className + '">' +
                            '<span class="annualFunctionDay">' + i +
                            "(" + settings.weekName[dayOfWeek] + ")</span>" +
                            '<span class="annualFunctionName">' +
                            annualFunctionName + "</span></div>";
      }
    }

    // 休日がある場合
    if (holidays !== "") {
      holidays = '<div class="holidayList">' +
                 '<div class="holidayHead">休日</div>' +
                 '<div class="holidayBody">' + holidays + "</div></div>";
      $(target).append(holidays);
    }

    // 二十四節気がある場合
    if (nijushiSekkiDays !== "") {
      nijushiSekkiDays = '<div class="nijushiSekkiList">' +
                         '<div class="nijushiSekkiHead">二十四節気</div>' +
                         '<div class="nijushiSekkiBody">' + nijushiSekkiDays +
                         "</div></div>";
      $(target).append(nijushiSekkiDays);
    }

    // 年中行事がある場合
    if (annualFunctions !== "") {
      annualFunctions = '<div class="annualFunctionList">' +
                        '<div class="annualFunctionHead">年中行事</div>' +
                        '<div class="annualFunctionBody">' + annualFunctions +
                        "</div></div>";
      $(target).append(annualFunctions);
    }

    //
    // 西暦を和暦に変換
    // 参考：http://www.openreference.org/articles/view/189
    //

    function toJapaneseEra(year, month) {
      var jaYear = "";

      if (year >= 1990) {
        jaYear = "平成" + (year - 1988);
      } else if (year === 1989) {
        jaYear = "平成元";
      } else if (year >= 1927) {
        jaYear = "昭和" + (year - 1925);
      } else if (year === 1926) {
        if (month >= 12) {
          jaYear = "昭和元";
        } else {
          jaYear = "大正" + (year - 1911);
        }
      } else if (year >= 1913) {
        jaYear = "大正" + (year - 1911);
      } else if (year === 1912) {
        if (month >= 7) {
          jaYear = "大正元";
        } else {
          jaYear = "明治" + (year - 1867);
        }
      } else if (year >= 1869) {
        jaYear = "明治" + (year - 1867);
      } else if (year === 1868) {
        jaYear = "明治元";
      }

      return jaYear;
    }

    //
    // 新暦の月を旧暦の月に変換
    //

    function toOldMonth(month) {
      var oldMonthList = ["睦月", "如月", "弥生", "卯月", "皐月", "水無月",
                          "文月", "葉月", "長月", "神無月", "霜月", "師走"];

      return oldMonthList[month];
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
    // 年の干支（十二支）を計算
    //

    function etoYear(year) {
      var etoList = ["申", "酉", "戌", "亥", "子", "丑",
                     "寅", "卯", "辰", "巳", "午", "未"];

      return etoList[year % 12];
    }

    //
    // 日の干支（十二支）を計算
    //

    function etoDay(date) {
      var etoList = ["寅", "卯", "辰", "巳", "午", "未",
                     "申", "酉", "戌", "亥", "子", "丑"];
      // ユリウス日
      var JD = date.getJD() + 0.5;
      // 修正ユリウス日
      var MJD = JD - 2400000.5;

      var modMJD = MJD % 12;

      if (modMJD < 0) {
        modMJD += 12;
      }

      return etoList[modMJD];
    }

    //
    // 二十四節気の判定
    // 参考：http://eco.mtk.nao.ac.jp/koyomi/faq/24sekki.html
    //

    function checkNijushiSekki(date) {
      var nijushiSekkiList = ["春分", "清明", "穀雨", "立夏", "小満", "芒種",
                              "夏至", "小暑", "大暑", "立秋", "処暑", "白露",
                              "秋分", "寒露", "霜降", "立冬", "小雪", "大雪",
                              "冬至", "小寒", "大寒", "立春", "雨水", "啓蟄"];

      var nextDate = new Date(date.getFullYear(), date.getMonth(),
                              date.getDate() + 1);
      var dateLongitude = Math.floor(longitudeSun(date) / 15.0);
      var nextDateLongitude = Math.floor(longitudeSun(nextDate) / 15.0);

      if (dateLongitude !== nextDateLongitude) {
        return nijushiSekkiList[nextDateLongitude];
      } else {
        return "";
      }
    }

    //
    // 年中行事の判定
    //

    function checkAnnualFunction(date) {
      var year = date.getFullYear();
      var month = date.getMonth();
      var day = date.getDate();
      var annualFunctionName = "";

      switch (month) {
        case 0:
          if (day === 7) {
            annualFunctionName = "七草";
          } else if (day === 11) {
            annualFunctionName = "鏡開き";
          }
          break;
        case 1:
          if (day === 14) {
            annualFunctionName = "バレンタインデー";
          } else if (checkNijushiSekki(new Date(year, month,
                                                day + 1)) === "立春") {
            annualFunctionName = "節分";
          }
          break;
        case 2:
          if (day === 3) {
            annualFunctionName = "雛祭り(桃の節句)";
          } else if (day === 14) {
            annualFunctionName = "ホワイトデー";
          } else if (checkNijushiSekki(new Date(year, month,
                                                day + 3)) === "春分") {
            annualFunctionName = "彼岸の入り";
          } else if (checkNijushiSekki(new Date(year, month,
                                                day - 3)) === "春分") {
            annualFunctionName = "彼岸明け";
          }
          break;
        case 3:
          if (day === 1) {
            annualFunctionName = "エイプリルフール";
          }
          break;
        case 4:
          if (day === 1) {
            annualFunctionName = "メーデー";
          } else if (date.getDay() === 0 &&
                     Math.floor((day - 1) / 7) + 1 === 2) {
            // 第2日曜
            annualFunctionName = "母の日";
          }
          if (checkNijushiSekki(new Date(year, month, day - 87)) === "立春") {
            if (day === 1) {
              annualFunctionName += "／";
            }
            annualFunctionName += "八十八夜";
          }
          break;
        case 5:
          if (date.getDay() === 0 && Math.floor((day - 1) / 7) + 1 === 3) {
            // 第3日曜
            annualFunctionName = "父の日";
          } else if (Math.floor(longitudeSun(date)) === 79 &&
                     Math.floor(longitudeSun(new Date(year, month,
                                                      day + 1))) === 80) {
            annualFunctionName = "入梅";
          }
          break;
        case 6:
          if (day === 7) {
            annualFunctionName = "七夕";
          } else if (Math.floor(longitudeSun(date)) === 99 &&
                     Math.floor(longitudeSun(new Date(year, month,
                                                      day + 1))) === 100) {
            annualFunctionName = "半夏生";
          } else if (longitudeSun(date) > 116 && etoDay(date) === "丑") {
            annualFunctionName = "土用の丑の日";
          }
          break;
        case 7:
          if (day === 15) {
            annualFunctionName = "お盆(旧盆)";
          } else if (longitudeSun(date) < 134 && etoDay(date) === "丑") {
            annualFunctionName = "土用の丑の日";
          } else if (checkNijushiSekki(new Date(year, month,
                                                day - 209)) === "立春") {
            annualFunctionName = "二百十日";
          }
          break;
        case 8:
          if (checkNijushiSekki(new Date(year, month,
                                         day - 209)) === "立春") {
            annualFunctionName = "二百十日";
          } else if (checkNijushiSekki(new Date(year, month,
                                                day + 3)) === "秋分") {
            annualFunctionName = "彼岸の入り";
          } else if (checkNijushiSekki(new Date(year, month,
                                                day - 3)) === "秋分") {
            annualFunctionName = "彼岸明け";
          }
          break;
        case 9:
          if (day === 31) {
            annualFunctionName = "ハロウィン";
          }
          break;
        case 10:
          if (day === 15) {
            annualFunctionName = "七五三";
          }
          break;
        case 11:
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

    // メソッドチェーン対応
    return this;
  };
})(jQuery);
