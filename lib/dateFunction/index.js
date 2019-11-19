import { compose } from "./logicHOF";

const abstractClockDate = date => ({
  years: date.getFullYear(),
  months: date.getMonth() + 1,
  days: date.getDate()
});

const abstractClockTime = date => ({
  hours: date.getHours(),
  minutes: date.getMinutes() + 1,
  seconds: date.getSeconds()
});

const abstractDayAndTime = date => ({
  years: date.getFullYear(),
  months: date.getMonth() + 1,
  days: date.getDate(),
  hours: date.getHours(),
  minutes: date.getMinutes() + 1,
  seconds: date.getSeconds()
});

const formatDate = format => date =>
  format
    .replace("yyyy", date.years)
    .replace("mm", date.months)
    .replace("dd", date.days);

const formatClock = format => time =>
  format
    .replace("hh", time.hours)
    .replace("mm", time.minutes)
    .replace("ss", time.seconds);

const formatDayAndTime = format => time =>
  format
    .replace("YYYY", time.years)
    .replace("MM", time.months)
    .replace("DD", time.days)
    .replace("hh", time.hours)
    .replace("mm", time.minutes)
    .replace("ss", time.seconds);

const calcSecondTime = second => {
  return {
    hours: Math.floor(second / 3600),
    minutes: Math.floor((second % 3600) / 60),
    seconds: second % 60
  };
};

const doubleDigitsDay = civilianTime =>
  compose(prependZero("months"), prependZero("days"))(civilianTime);

const doubleDigitsTime = civilianTime =>
  compose(
    prependZero("hours"),
    prependZero("minutes"),
    prependZero("seconds")
  )(civilianTime);

const doubleDigitsDayAndTime = civilianTime =>
  compose(
    prependZero("months"),
    prependZero("days"),
    prependZero("hours"),
    prependZero("minutes"),
    prependZero("seconds")
  )(civilianTime);

const prependZero = key => clockTime => ({
  ...clockTime,
  [key]: clockTime[key] < 10 ? "0" + clockTime[key] : clockTime[key]
});

// local function

const beforeDay = beforeday => {
  let curDate = new Date();
  return new Date(
    curDate.getFullYear(),
    curDate.getMonth(),
    curDate.getDate() - beforeday
  );
};

/**
 *
 * @param {Number} time
 * the second of dead-line
 * @return {String}
 * the String of dead-line
 */

const deadlineTimeString = time =>
  compose(formatClock(`hh:mm:ss`), doubleDigitsTime, calcSecondTime)(time);

/**
 *
 * @param {Number} beforeday
 * the Number before now day
 * @return {String}
 * the String for post data
 */

const postDateBeforeDay = beforeday =>
  compose(
    formatDate("yyyy-mm-dd"),
    doubleDigitsDay,
    abstractClockDate,
    beforeDay
  )(beforeday);
/**
 * @return
 * the String for post data
 */
const postDateNowDay = () =>
  compose(
    formatDate("yyyy-mm-dd"),
    doubleDigitsDay,
    abstractClockDate
  )(new Date());

const calcBettingHistoryTime = date =>
  compose(
    formatDayAndTime("MM-DD hh:mm:ss"),
    doubleDigitsDay,
    doubleDigitsTime,
    abstractDayAndTime
  )(new Date(date * 1000));

export {
  deadlineTimeString,
  postDateBeforeDay,
  postDateNowDay,
  calcBettingHistoryTime
};
