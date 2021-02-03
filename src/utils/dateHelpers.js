// Everything dates live here
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/**
*
* @return { Date } Sun Nov 08 2020 20:46:51 GMT-0600 (Central Standard Time)
* 
*/
export function getYesterdayDate() {
  const today = new Date(); // in local time
  return new Date(today.setDate(today.getDate() - 1));
};

/**
*
* @return { string } 11/9/2020
*
*/
export function getTomorrowsDate() {
  // FIXME: this needs to change to only return a date object
  const today = new Date(); // in local time
  const tomorrow = today;
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toLocaleDateString();
}

/**
 *
 * @params {Date} - Mon Nov 09 2020 20:32:32 GMT-0600 (Central Standard Time)
 * @return {String} - 2020-11-08
 *
 */
export function formateDate(date) {
  return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
}


/**
 *
 * @params {Date} - start "2020-11-19T09:00:00-06:00"
 * @params {Date} - end "2020-11-19T09:30:00-06:00"
 * @return {String} - "09:00 AM - 09:30 AM"
 *
 */
export function formateTime(start, end) {
  const options = { hour: '2-digit', minute: '2-digit' };
  return `${new Date(start).toLocaleTimeString([], options)} - 
    ${new Date(end).toLocaleTimeString([], options)}`
};

/**
 *
 * Take care not to pass some random number in, it will produce a date and return
 * the Day of week.
 * @params {String} - "11-19-2020" || "2020-11-19" ||
 * @params {Object} - 2020-11-19T09:30:00-06:00
 * @return {String} - "Monday"
 *
 */
export function getDayOfTheWeek(date) {
  const workingDateIndex = new Date(date).getUTCDay();
  if (isNaN(workingDateIndex))
    throw new Error('You must provide a date string or date object');
  const dayOfTheWeek = DAYS[workingDateIndex]
  return dayOfTheWeek;
};

/**
 *
 * Gets the day before a date.
 * Examples:
 * if today is Wednesday @return Tuesday date
 * @return { Date } Sun Nov 08 2020 20:46:51 GMT-0600 (Central Standard Time)
 *
 */
export function getDayBefore(date) {
  return new Date(date.setDate(date.getDate() - 1));
}


/**
 *
 * Gets the last weekday date.
 * Examples:
 * if today is Wednesday @return Wednesday date
 * if today is Saturday || Sunday @return Fridays date
 * @return { Date } Sun Nov 08 2020 20:46:51 GMT-0600 (Central Standard Time)
 *
 */
export function getLastWeekDay() {
  const today = new Date();

  console.log('today', today)
  if (today.getDay() === 0) {
    // if today === Sunday
    const twoDaysAgo = today.setDate(today.getDate() - 2)
    const result = new Date(twoDaysAgo);
    console.log('twoDaysAgo', result)
    return result;
  }

  if (today.getDay() === 6) {
    // if today === Saturday
    const twoDaysAgo = today.setDate(today.getDate() - 1)
    return new Date(twoDaysAgo);
  }
  return today;
};
