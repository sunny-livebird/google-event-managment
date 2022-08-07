const convertHoursToDate = hours => {
  const today = new Date();
  const minutes = '00';
  return new Date(today.setHours(hours, minutes));
};
const getEventDate = date => {
  var year = date.getFullYear();
  var month = ('0' + (date.getMonth() + 1)).slice(-2);
  var day = ('0' + date.getDate()).slice(-2);
  return year + '-' + month + '-' + day;
};
const getFormatString = (date, time) => {
  var timeString =
    ('0' + time.getHours()).slice(-2) +
    ':' +
    ('0' + time.getMinutes()).slice(-2) +
    ':00';
  var year = date.getFullYear();
  var month = ('0' + (date.getMonth() + 1)).slice(-2);
  var day = ('0' + date.getDate()).slice(-2);
  var dateString = '' + year + '-' + month + '-' + day;
  return dateString + ' ' + timeString;
};
const getMonthDay = dateString => {
  const date = new Date(dateString);
  return date.getMonth();
};

const getDayName = date => {
  var days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return days[date.getDay()];
};
const getDayInStringFormat = date => {
  var dateCurrent = date;
  if (typeof dateCurrent === 'string') {
    dateCurrent = new Date(dateCurrent);
  }
  return dateUtility.getEventDate(dateCurrent);
};
const dateUtility = {
  convertHoursToDate,
  getEventDate,
  getFormatString,
  getDayName,
  getDayInStringFormat,
  getMonthDay,
};

export default dateUtility;
