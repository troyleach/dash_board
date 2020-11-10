// Everything dates live here

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