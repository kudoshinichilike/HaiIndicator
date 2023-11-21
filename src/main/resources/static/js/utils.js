var dateToString = function (date) {
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    if (dd < 10)
        dd = '0' + dd;
    if (mm < 10)
        mm = '0' + mm;
    return yyyy + '-' + mm + '-' + dd;
}

var shortDate = function (date) {
    return date.split('-').slice(1).join('-');
}

var timestampToMSM = function (timestamp) {
    let date = new Date(parseInt(timestamp));
    return date.getMinutes() + 'p:' + date.getSeconds() + 's:' + date.getMilliseconds();
}

var isDefined = function (o) {
    return typeof o !== 'undefined';
}

var isUndefined = function (o) {
    return typeof o == 'undefined';
}

var isEmpty = function (o) {
    return typeof o == null || o == '';
}

var getDates = function (startDate, endDate) {
  const dateArray = [];
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    dateArray.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateArray;
}

var isDateDifferenceLessThanDays = function (dateStart, dateEnd, day) {
    let startDate = new Date(dateStart);
    let endDate = new Date(dateEnd);

    let timeDifference = endDate - startDate;
    let daysDifference = timeDifference / (1000 * 60 * 60 * 24);

   return daysDifference <= day;
}
