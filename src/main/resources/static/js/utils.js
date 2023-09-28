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
