<!--
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
//_/
//_/ CopyRight(C) K.Tsunoda(AddinBox) 2001 All Rights Reserved.
//_/ ( http://addinbox.sakura.ne.jp/index.htm )
//_/ ( ãåÉTÉCÉg  http://www.h3.dion.ne.jp/~sakatsu/index.htm )
//_/
//_/ Ç±ÇÃèjì˙îªíËÉRÅ[ÉhÇÕÅwExcel:ktä÷êîÉAÉhÉCÉìÅxÇ≈égópÇµÇƒÇ¢ÇÈ
//_/ ÇuÇaÇ`É}ÉNÉçÇ[JavaScript]Ç…à⁄êAÇµÇΩÇ‡ÇÃÇ≈Ç∑ÅB
//_/
//_/ Ç±ÇÃä÷êîÇ≈ÇÕÅAÇQÇOÇPÇXîNé{çsÇÃâ¸ê≥èjì˙ñ@(ìVçcíaê∂ì˙ÇÃïœçX)Ç‹Ç≈Ç
//_/ ÉTÉ|Å[ÉgÇµÇƒÇ¢Ç‹Ç∑ÅB
//_/
//_/ (*1)Ç±ÇÃÉRÅ[ÉhÇà¯ópÇ∑ÇÈÇ…ìñÇΩÇ¡ÇƒÇÕÅAïKÇ∏Ç±ÇÃÉRÉÅÉìÉgÇ‡
//_/ àÍèèÇ…à¯ópÇ∑ÇÈéñÇ∆ÇµÇ‹Ç∑ÅB
//_/ (*2)ëºÉTÉCÉgè„Ç≈ñ{É}ÉNÉçÇíºê⁄à¯ópÇ∑ÇÈéñÇÕÅAÇ≤âìó∂äËÇ¢Ç‹Ç∑ÅB
//_/ Åy http://addinbox.sakura.ne.jp/holiday_logic.htm Åz
//_/ Ç÷ÇÃÉäÉìÉNÇ…ÇÊÇÈè–âÓÇ≈ëŒâûÇµÇƒâ∫Ç≥Ç¢ÅB
//_/ (*3)[ktHolidayName]Ç∆Ç¢Ç§ä÷êîñºÇªÇÃÇ‡ÇÃÇÕÅAäeé©ÇÃä¬ã´Ç…
//_/ Ç®ÇØÇÈñΩñºãKë•Ç…âàÇ¡ÇƒïœçXÇµÇƒÇ‡ç\Ç¢Ç‹ÇπÇÒÅB
//_/ 
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
//
// 2008/10/29 ïœêîÇÃvaréwíËÇ™ñ≥Ç≠ÅAçLàÊïœêîàµÇ¢Ç…Ç»Ç¡ÇƒÇ¢ÇΩÇÃÇèCê≥ÇµÇ‹ÇµÇΩÅB
//
// 2014/5/29  ÅuéRÇÃì˙ÅvÇÃèjì˙ñ@â¸ê≥
//
// 2015/7/11  JavaScript1.3 à»ç~Ç≈ÇÕ[1970/1/1]à»ëOÇ‡àµÇ¶ÇÈÇΩÇﬂÅAì˙ïtîÕàÕÇÃêßå¿Çâèú
//
// 2018/2/15 ÅuìVçcíaê∂ì˙ÇÃïœçXÅi12/23 ÅÀ 2/23ÅjÇÃèjì˙ñ@â¸ê≥

var MONDAY = 1;
var TUESDAY = 2;
var WEDNESDAY = 3;

var cstImplementTheLawOfHoliday = new Date("1948/7/20");  // èjì˙ñ@é{çs
var cstAkihitoKekkon = new Date("1959/4/10");              // ñæêmêeâ§ÇÃåãç•ÇÃãV
var cstShowaTaiso = new Date("1989/2/24");                // è∫òaìVçcëÂërÇÃóÁ
var cstNorihitoKekkon = new Date("1993/6/9");            // ìøêmêeâ§ÇÃåãç•ÇÃãV
var cstSokuireiseiden = new Date("1990/11/12");          // ë¶à óÁê≥ìaÇÃãV
var cstImplementHoliday = new Date("1973/4/12");        // êUë÷ãxì˙é{çs

// [prmDate]Ç…ÇÕ "yyyy/m/d"å`éÆÇÃì˙ïtï∂éöóÒÇìnÇ∑
function ktHolidayName(prmDate)
{
  var MyDate = new Date(prmDate);
  var HolidayName = prvHolidayChk(MyDate);
  var YesterDay;
  var HolidayName_ret;

  if (HolidayName == "") {
      if (MyDate.getDay() == MONDAY) {
          // åéójà»äOÇÕêUë÷ãxì˙îªíËïsóv
          // 5/6(âŒ,êÖ)ÇÃîªíËÇÕprvHolidayChkÇ≈èàóùçœ
          // 5/6(åé)ÇÕÇ±Ç±Ç≈îªíËÇ∑ÇÈ
          if (MyDate.getTime() >= cstImplementHoliday.getTime()) {
              YesterDay = new Date(MyDate.getFullYear(),
                                     MyDate.getMonth(),(MyDate.getDate()-1));
              HolidayName = prvHolidayChk(YesterDay);
              if (HolidayName != "") {
                  HolidayName_ret = "êUë÷ãxì˙";
              } else {
                  HolidayName_ret = "";
              }
          } else {
              HolidayName_ret = "";
          }
      } else {
          HolidayName_ret = "";
      }
  } else {
      HolidayName_ret = HolidayName;
  }

  return HolidayName_ret;
}

//===============================================================

function prvHolidayChk(MyDate)
{
  var MyYear = MyDate.getFullYear();
  var MyMonth = MyDate.getMonth() + 1;    // MyMonth:1Å`12
  var MyDay = MyDate.getDate();
  var NumberOfWeek;
  var MyAutumnEquinox;

  var Result = "";

 if (MyDate.getTime() < cstImplementTheLawOfHoliday.getTime()) {
 Å@Å@return ""; // èjì˙ñ@é{çs(1948/7/20)à»ëO
 } else;

  switch (MyMonth) {
// ÇPåé //
  case 1:
      if (MyDay == 1) {
          Result = "å≥ì˙";
      } else {
          if (MyYear >= 2000) {
              NumberOfWeek = Math.floor((MyDay - 1) / 7) + 1;
              if ((NumberOfWeek == 2) && (MyDate.getDay() == MONDAY)) {
                  Result = "ê¨êlÇÃì˙";
              } else;
          } else {
              if (MyDay == 15) {
                  Result = "ê¨êlÇÃì˙";
              } else;
          }
      }
      break;
// ÇQåé //
  case 2:
      if (MyDay == 11) {
          if (MyYear >= 1967) {
              Result = "åöçëãLîOÇÃì˙";
          } else;
      } else {
          if (MyDay == 23) {
              if (MyYear >= 2020) {
                  Result = "ìVçcíaê∂ì˙";
              } else;
          } else {
              if (MyDate.getTime() == cstShowaTaiso.getTime()) {
                  Result = "è∫òaìVçcÇÃëÂërÇÃóÁ";
              } else;
          }
      }
      break;
// ÇRåé //
  case 3:
      if (MyDay == prvDayOfSpringEquinox(MyYear)) {  // 1948Å`2150à»äOÇÕ[99]
          Result = "ètï™ÇÃì˙";                       // Ç™ï‘ÇÈÇÃÇ≈§ïKÇ∏ÅÇÇ…Ç»ÇÈ
      } else;
      break;
// ÇSåé //
  case 4:
      if (MyDay == 29) {
          if (MyYear >= 2007) {
              Result = "è∫òaÇÃì˙";
          } else {
              if (MyYear >= 1989) {
                  Result = "Ç›Ç«ÇËÇÃì˙";
              } else {
                Result = "ìVçcíaê∂ì˙";  // è∫òaìVçc
              }
          }
      } else {
           if (MyDate.getTime() == cstAkihitoKekkon.getTime()) {
           Å@Å@Result = "çcëæéqñæêmêeâ§ÇÃåãç•ÇÃãV";Å@Å@// (=1959/4/10)
           } else;
      }
      break;
// ÇTåé //
  case 5:
      switch ( MyDay ) {
        case 3:  // ÇTåéÇRì˙
          Result = "åõñ@ãLîOì˙";
          break;
        case 4:  // ÇTåéÇSì˙
          if (MyYear >= 2007) {
              Result = "Ç›Ç«ÇËÇÃì˙";
          } else {
              if (MyYear >= 1986) {
                  if (MyDate.getDay() > MONDAY) {
                  // 5/4Ç™ì˙ójì˙ÇÕÅwë¸ÇÃì˙ójÅx§åéójì˙ÇÕÅwåõñ@ãLîOì˙ÇÃêUë÷ãxì˙Åx(Å`2006îN)
                      Result = "çëñØÇÃãxì˙";
                  } else;
              } else;
          }
          break;
        case 5:  // ÇTåéÇTì˙
          Result = "Ç±Ç«Ç‡ÇÃì˙";
          break;
        case 6:  // ÇTåéÇUì˙
          if (MyYear >= 2007) {
              if ((MyDate.getDay() == TUESDAY) || (MyDate.getDay() == WEDNESDAY)) {
                  Result = "êUë÷ãxì˙";    // [5/3,5/4Ç™ì˙ój]ÉPÅ[ÉXÇÃÇ›ÅAÇ±Ç±Ç≈îªíË
              } else;
          } else;
          break;
      }
      break;
// ÇUåé //
  case 6:
      if (MyDate.getTime() == cstNorihitoKekkon.getTime()) {
          Result = "çcëæéqìøêmêeâ§ÇÃåãç•ÇÃãV";
      } else;
      break;
// ÇVåé //
  case 7:
      if (MyYear >= 2003) {
          NumberOfWeek = Math.floor((MyDay - 1) / 7) + 1;
          if ((NumberOfWeek == 3) && (MyDate.getDay() == MONDAY)) {
              Result = "äCÇÃì˙";
          } else;
      } else {
          if (MyYear >= 1996) {
              if (MyDay == 20) {
                  Result = "äCÇÃì˙";
              } else;
          } else;
      }
      break;
// ÇWåé //
  case 8:
      if (MyDay == 11) {
          if (MyYear >= 2016) {
              Result = "éRÇÃì˙";
          } else;
      } else;
      break;
// ÇXåé //
  case 9:
      //ëÊÇRåéójì˙(15Å`21)Ç∆èHï™ì˙(22Å`24)Ç™èdÇ»ÇÈéñÇÕÇ»Ç¢
      MyAutumnEquinox = prvDayOfAutumnEquinox(MyYear);
      if (MyDay == MyAutumnEquinox) {    // 1948Å`2150à»äOÇÕ[99]
          Result = "èHï™ÇÃì˙";           // Ç™ï‘ÇÈÇÃÇ≈§ïKÇ∏ÅÇÇ…Ç»ÇÈ
      } else {
          if (MyYear >= 2003) {
              NumberOfWeek = Math.floor((MyDay - 1) / 7) + 1;
              if ((NumberOfWeek == 3) && (MyDate.getDay() == MONDAY)) {
                  Result = "åhòVÇÃì˙";
              } else {
                  if (MyDate.getDay() == TUESDAY) {
                      if (MyDay == (MyAutumnEquinox - 1)) {
                          Result = "çëñØÇÃãxì˙";
                      } else;
                  } else;
              }
          } else {
              if (MyYear >= 1966) {
                  if (MyDay == 15) {
                      Result = "åhòVÇÃì˙";
                  } else;
              } else;
          }
      }
      break;
// ÇPÇOåé //
  case 10:
      if (MyYear >= 2000) {
          NumberOfWeek = Math.floor(( MyDay - 1) / 7) + 1;
          if ((NumberOfWeek == 2) && (MyDate.getDay() == MONDAY)) {
              Result = "ëÃàÁÇÃì˙";
          } else;
      } else {
          if (MyYear >= 1966) {
              if (MyDay == 10) {
                  Result = "ëÃàÁÇÃì˙";
              } else;
          } else;
      }
      break;
// ÇPÇPåé //
  case 11:
      if (MyDay == 3) {
          Result = "ï∂âªÇÃì˙";
      } else {
          if (MyDay == 23) {
              Result = "ãŒòJä¥é”ÇÃì˙";
          } else {
              if (MyDate.getTime() == cstSokuireiseiden.getTime()) {
                  Result = "ë¶à óÁê≥ìaÇÃãV";
              } else;
          }
      }
      break;
// ÇPÇQåé //
  case 12:
      if (MyDay == 23) {
          if ((MyYear >= 1989) && (MyYear <= 2018)) {
              Result = "ìVçcíaê∂ì˙";     // ïΩê¨ìVçc
          } else;
      } else;
      break;
  }

  return Result;
}

//===================================================================
// ètï™/èHï™ì˙ÇÃó™éZéÆÇÕ
// ÅwäCè„ï€à¿í°êÖòHïî óÔåvéZå§ãÜâÔï“ êVÇ±ÇÊÇ›ï÷óòí†Åx
// Ç≈è–âÓÇ≥ÇÍÇƒÇ¢ÇÈéÆÇ≈Ç∑ÅB
function prvDayOfSpringEquinox(MyYear)
{
  var SpringEquinox_ret;

  if (MyYear <= 1947) {
      SpringEquinox_ret = 99;    //èjì˙ñ@é{çsëO
  } else {
      if (MyYear <= 1979) {
          // Math.floor ä÷êîÇÕ[VBAÇÃIntä÷êî]Ç…ëäìñ
          SpringEquinox_ret = Math.floor(20.8357 + 
            (0.242194 * (MyYear - 1980)) - Math.floor((MyYear - 1980) / 4));
      } else {
          if (MyYear <= 2099) {
              SpringEquinox_ret = Math.floor(20.8431 + 
                (0.242194 * (MyYear - 1980)) - Math.floor((MyYear - 1980) / 4));
          } else {
              if (MyYear <= 2150) {
                  SpringEquinox_ret = Math.floor(21.851 + 
                    (0.242194 * (MyYear - 1980)) - Math.floor((MyYear - 1980) / 4));
              } else {
                  SpringEquinox_ret = 99;    //2151îNà»ç~ÇÕó™éZéÆÇ™ñ≥Ç¢ÇÃÇ≈ïsñæ
              }
          }
      }
  }
  return SpringEquinox_ret;
}

//=====================================================================
function prvDayOfAutumnEquinox(MyYear)
{
  var AutumnEquinox_ret;

  if (MyYear <= 1947) {
      AutumnEquinox_ret = 99; //èjì˙ñ@é{çsëO
  } else {
      if (MyYear <= 1979) {
          // Math.floor ä÷êîÇÕ[VBAÇÃIntä÷êî]Ç…ëäìñ
          AutumnEquinox_ret = Math.floor(23.2588 + 
            (0.242194 * (MyYear - 1980)) - Math.floor((MyYear - 1980) / 4));
      } else {
          if (MyYear <= 2099) {
              AutumnEquinox_ret = Math.floor(23.2488 + 
                (0.242194 * (MyYear - 1980)) - Math.floor((MyYear - 1980) / 4));
          } else {
              if (MyYear <= 2150) {
                  AutumnEquinox_ret = Math.floor(24.2488 + 
                    (0.242194 * (MyYear - 1980)) - Math.floor((MyYear - 1980) / 4));
              } else {
                  AutumnEquinox_ret = 99;    //2151îNà»ç~ÇÕó™éZéÆÇ™ñ≥Ç¢ÇÃÇ≈ïsñæ
              }
          }
      }
  }
  return AutumnEquinox_ret;
}

//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
//_/ CopyRight(C) K.Tsunoda(AddinBox) 2001 All Rights Reserved.
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/


//-->
